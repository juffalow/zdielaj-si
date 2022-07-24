export default {
  port: 3010,
  env: process.env.ENV || 'DEVELOPMENT',
  domain: process.env.DOMAIN || 'localhost',
  allowedOrigins: [
    'http://localhost:3000',
    'https://zdielaj.si',
  ],
  jwt: {
    secret: process.env.JWT_SECRET || '',
    ttl: 15 * 60,
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
  logger: {
    level: process.env.LOGGER_LEVEL || 'info',
  },
  services: {
    upload: {
      url: process.env.SERVICES_UPLOAD_URL || 'http://upload:3010',
    },
    notifications: {
      url: process.env.SERVICES_NOTIFICATIONS_URL || 'http://notifications:3010',
    },
  },
}
