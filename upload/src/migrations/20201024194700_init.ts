import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('file', (table) => {
    table.increments('id').primary();
    table.integer('userId').nullable().defaultTo(null).index();
    table.string('path').notNullable();
    table.string('mimetype', 32).notNullable();
    table.integer('size').notNullable().defaultTo(0);
    table.json('metadata').nullable().defaultTo(null);
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  })
  .createTable('thumbnail', (table) => {
    table.increments('id').primary();
    table.integer('fileId').unsigned().notNullable().references('id').inTable('file');
    table.string('path').notNullable();
    table.string('mimetype', 32).notNullable();
    table.integer('size').notNullable().defaultTo(0);
    table.json('metadata').nullable().defaultTo(null);
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  })
  .createTable('media_convert_job', (table) => {
    table.string('id').notNullable().comment('MediaConvert job ID').primary();
    table.integer('fileId').unsigned().notNullable().references('id').inTable('file');
    table.string('status').notNullable().defaultTo('NEW');
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('file')
    .dropTable('thumbnail')
    .dropTable('media_convert_job');
}
