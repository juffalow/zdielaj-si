export function up(knex): Promise<any> {
  return knex.schema.createTable('album', (album) => {
    album.string('id', 32).notNullable();
    album.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    album.primary('id');
  })
  .createTable('photo', (photo) => {
    photo.string('id', 32).notNullable();
    photo.string('albumId', 32).notNullable();
    photo.string('path').notNullable();
    photo.integer('size').notNullable().default(0);
    photo.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    photo.primary('id');
  })
  .createTable('thumbnail', (thumbnail) => {
    thumbnail.string('id', 32).notNullable();
    thumbnail.string('photoId', 32).notNullable();
    thumbnail.string('path').notNullable();
    thumbnail.integer('size').notNullable().default(0);
    thumbnail.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    thumbnail.primary('id');
  });
}

export function down(knex): Promise<any> {
  return knex.schema.dropTable('thumbnail')
    .dropTable('photo')
    .dropTable('album');
}
