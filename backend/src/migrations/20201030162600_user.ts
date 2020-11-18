export function up(knex): Promise<any> {
  return knex.schema.createTable('user', (user) => {
    user.increments('id').primary();
    user.string('name').notNullable().defaultTo('');
    user.string('email').notNullable();
    user.string('password').notNullable();
    user.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    user.unique('email');
  })
  .table('album', (album) => {
    album.integer('userId').unsigned().nullable().after('id').references('id').inTable('user').onDelete('cascade');
  })
  .table('photo', (photo) => {
    photo.foreign('albumId').references('id').inTable('album').onDelete('cascade');
  })
}

export function down(knex): Promise<any> {
  return knex.schema.table('album', (album) => {
      album.dropForeign('userId');
      album.dropColumn('userId');
    })
    .table('photo', (photo) => {
      photo.dropForeign('albumId');
      photo.dropColumn('albumId');
    })
    .dropTable('user');
}
