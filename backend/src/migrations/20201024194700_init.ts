import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('album', (album) => {
    album.string('id', 32).notNullable().primary();
    album.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  })
  .createTable('photo', (photo) => {
    photo.string('id', 32).notNullable().primary();
    photo.string('albumId', 32).notNullable();
    photo.string('path').notNullable();
    photo.integer('size').notNullable().defaultTo(0);
    photo.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  })
  .createTable('thumbnail', (thumbnail) => {
    thumbnail.string('id', 32).notNullable().primary();
    thumbnail.string('photoId', 32).notNullable();
    thumbnail.string('path').notNullable();
    thumbnail.integer('size').notNullable().defaultTo(0);
    thumbnail.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('thumbnail')
    .dropTable('photo')
    .dropTable('album');
}
