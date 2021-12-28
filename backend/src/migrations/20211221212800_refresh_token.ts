import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('refreshToken', (refreshToken) => {
    refreshToken.increments('id').primary();
    refreshToken.integer('userId').unsigned().nullable().references('id').inTable('user').onDelete('cascade');
    refreshToken.string('token').notNullable();
    refreshToken.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    refreshToken.timestamp('expiresAt').defaultTo(null);
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('refreshToken');
}
