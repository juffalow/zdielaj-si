import { Knex } from 'knex';
import config from '../config';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('public_profile', (table) => {
    config.database.primaryKeyType === 'INT' && table.increments('id').primary();
    config.database.primaryKeyType === 'UUID' && table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    config.database.services.user.primaryKeyType === 'INT' && table.integer('userId').unsigned().index();
    config.database.services.user.primaryKeyType === 'UUID' && table.uuid('userId').nullable().index();
    table.string('name', 64).notNullable();
    table.string('slug', 64).notNullable();
    table.text('description').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.unique([ 'slug' ]);
  }).table('album', (table) => {
    config.database.primaryKeyType === 'INT' && table.integer('publicProfileId', 32).unsigned().nullable().defaultTo(null).references('id').inTable('public_profile').onDelete('cascade');
    config.database.primaryKeyType === 'UUID' && table.uuid('publicProfileId').nullable().defaultTo(null).references('id').inTable('public_profile').onDelete('cascade');
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('public_profile')
    .table('album', (table) => {
      table.dropColumn('publicProfileId');
    });
}
