import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('media', (table) => {
    table.increments('id').primary();
    table.string('path').notNullable();
    table.string('mimetype', 32).notNullable();
    table.integer('size').notNullable().defaultTo(0);
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  })
  .createTable('thumbnail', (table) => {
    table.increments('id').primary();
    table.integer('mediaId').unsigned().notNullable().references('id').inTable('media');
    table.string('path').notNullable();
    table.string('mimetype', 32).notNullable();
    table.integer('size').notNullable().defaultTo(0);
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('media')
    .dropTable('thumbnail');
}