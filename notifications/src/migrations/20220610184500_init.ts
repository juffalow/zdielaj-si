import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('email_notification', (table) => {
    table.comment('User mail subscription to events');
    table.increments('id').primary();
    table.string('email', 128).notNullable();
    table.string('event', 64).notNullable();
    table.boolean('isEnabled').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  }).createTable('email_log', (table) => {
    table.comment('List of sent emails');
    table.increments('id').primary();
    table.string('email', 128).notNullable();
    table.string('subject', 128).notNullable();
    table.text('body').notNullable();
    table.json('meta').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('email_notification')
    .dropTable('email_log');
}
