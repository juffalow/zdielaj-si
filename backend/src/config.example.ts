export default {
  port: 3010,
  allowedOrigins: [
    'http://localhost:3000',
  ],
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
  storage: {
    url: process.env.STORAGE_URL || '',
    originalUrl: process.env.STORAGE_ORIGINAL_URL || '',
    key: process.env.STORAGE_KEY || '',
    endpoint: process.env.STORAGE_ENDPOINT || '',
    secret: process.env.STORAGE_SECRET || '',
    bucket: process.env.STORAGE_BUCKET || '',
  },
  database: {
    connection: {
      database : process.env.DATABASE_NAME || '',
      host : process.env.DATABASE_HOST || '',
      password : process.env.DATABASE_PASSWORD || '',
      user : process.env.DATABASE_USER || '',
      port : process.env.DATABASE_PORT || 3306,
    },
    runMigrations: true,
  },
}
