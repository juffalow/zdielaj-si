import { Knex } from 'knex';
import config from '../config';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('album', (album) => {
    config.database.primaryKeyType === 'INT' && album.increments('id').primary();
    config.database.primaryKeyType === 'UUID' && album.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    config.database.services.user.primaryKeyType === 'INT' && album.integer('userId').unsigned().nullable().index();
    config.database.services.user.primaryKeyType === 'UUID' && album.uuid('userId').nullable().defaultTo(null).index();
    album.string('hash', 32).notNullable();
    album.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    album.unique([ 'hash' ]);
  }).createTable('album_media', (table) => {
    config.database.primaryKeyType === 'INT' && table.increments('id').primary();
    config.database.primaryKeyType === 'UUID' && table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    config.database.primaryKeyType === 'INT' && table.integer('albumId', 32).unsigned().notNullable().references('id').inTable('album').onDelete('cascade');
    config.database.primaryKeyType === 'UUID' && table.uuid('albumId').notNullable().references('id').inTable('album').onDelete('cascade');
    config.database.services.upload.primaryKeyType === 'INT' && table.integer('fileId').unsigned().notNullable();
    config.database.services.upload.primaryKeyType === 'UUID' && table.uuid('fileId').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('media')
    .dropTable('album');
}
