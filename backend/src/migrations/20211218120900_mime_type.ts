import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('photo', (album) => {
    album.string('mimetype', 32).nullable().after('albumId');
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('photo', (photo) => {
    photo.dropColumn('mimetype');
  });
}
