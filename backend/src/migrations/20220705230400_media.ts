import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('media', (table) => {
    table.increments('id').primary();
    table.string('albumId', 32).notNullable().references('id').inTable('album').onDelete('cascade');
    table.integer('mediaId').unsigned().notNullable();
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('media');
}
