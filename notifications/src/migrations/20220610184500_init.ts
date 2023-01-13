import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('email', 128);
    table.boolean('isDeliverable').notNullable().defaultTo(true).comment('bounce or complaint').notNullable();
    table.json('meta').nullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.unique([ 'email' ]);
  }).createTable('user_notification_setting', (table) => {
    table.comment('User mail subscription to events');
    table.increments('id').primary();
    table.integer('userId').unsigned().notNullable().references('id').inTable('user').onDelete('cascade');
    table.string('type', 16).comment('email, sms, inapp, ...').notNullable();
    table.string('notification', 64).notNullable();
    table.boolean('isEnabled').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.unique([ 'userId', 'notification' ]);
  }).createTable('notification', (table) => {
    table.increments('id').primary();
    table.integer('userId').unsigned().notNullable().references('id').inTable('user').onDelete('cascade');
    table.string('type', 16).comment('email, sms, inapp, ...').notNullable();
    table.string('subject', 128).notNullable();
    table.text('body').notNullable();
    table.json('meta').notNullable();
    table.string('status', 16).comment('sent, error, ...').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user')
    .dropTable('user_notification_setting')
    .dropTable('notification');
}
