import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user_channel', (table) => {
    table.increments('id').primary();
    table.integer('userId').unsigned().nullable();
    table.string('type', 16).comment('email, sms, inapp, ...').notNullable();
    table.json('meta').nullable();
    table.boolean('isEnabled').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.index(['userId', 'type']);
  }).createTable('user_channel_setting', (table) => {
    table.comment('User subscription to events');
    table.increments('id').primary();
    table.integer('userChannelId').unsigned().notNullable().references('id').inTable('user_channel').onDelete('cascade');
    table.string('notification', 64).notNullable();
    table.boolean('isEnabled').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.unique([ 'userChannelId', 'notification' ]);
  }).createTable('user_notification', (table) => {
    table.increments('id').primary();
    table.integer('userChannelId').unsigned().notNullable().references('id').inTable('user_channel').onDelete('cascade');
    table.string('notification', 64).notNullable();
    table.string('subject', 128).notNullable();
    table.text('body').notNullable();
    table.json('meta').notNullable();
    table.string('status', 16).comment('sent, error, ...').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user_channel')
    .dropTable('user_channel_setting')
    .dropTable('user_notification');
}
