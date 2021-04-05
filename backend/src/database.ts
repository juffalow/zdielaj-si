import { knex } from 'knex';
import config from './config';

const database = knex({
  client: 'mysql2',
  connection: config.database.connection,
  migrations: {
    directory: __dirname + '/migrations',
  },
});

export default database;
