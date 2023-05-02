import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('album', (album) => {
    album.increments('id').primary();
    album.integer('userId').unsigned().nullable();
    album.string('hash', 32).notNullable();
    album.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    album.unique([ 'hash' ]);
  }).createTable('album_media', (table) => {
    table.increments('id').primary();
    table.integer('albumId', 32).unsigned().notNullable().references('id').inTable('album').onDelete('cascade');
    table.integer('fileId').unsigned().notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('media')
    .dropTable('album');
}
