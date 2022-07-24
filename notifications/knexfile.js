module.exports = {
  client: 'mysql2',
  connection: {
    database: process.env.DATABASE_NAME,
    host : process.env.DATABASE_HOST,
    password : process.env.DATABASE_PASSWORD,
    user : process.env.DATABASE_USER,
    port : process.env.DATABASE_PORT,
  },
  migrations: {
    directory: './dist/migrations',
  },
  seeds: {
    directory: './dist/seeds',
  },
};
