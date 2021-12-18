import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', (user) => {
    user.increments('id').primary();
    user.string('name').notNullable().defaultTo('');
    user.string('email').notNullable().unique();
    user.string('password').notNullable();
    user.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  })
  .alterTable('album', (album) => {
    album.integer('userId').unsigned().nullable().after('id').references('id').inTable('user').onDelete('cascade');
  })
  .alterTable('photo', (photo) => {
    photo.foreign('albumId').references('id').inTable('album').onDelete('cascade');
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('album', (album) => {
      album.dropForeign('userId');
      album.dropColumn('userId');
    })
    .alterTable('photo', (photo) => {
      photo.dropForeign('albumId');
      photo.dropColumn('albumId');
    })
    .dropTable('user');
}
