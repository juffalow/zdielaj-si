import { Knex } from 'knex';

export function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('user', (user) => {
    user.string('token', 36).nullable().defaultTo(null);
    user.integer('isActive', 1).notNullable().defaultTo(0);
  }).then(() => {
    return knex.table('user').update({ isActive: 1 });
  });
}

export function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('user', (user) => {
    user.dropColumn('token');
    user.dropColumn('isActive');
  });
}
