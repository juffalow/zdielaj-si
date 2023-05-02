export default {
  port: process.env.PORT || 3010,
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
    frontend: {
      url: process.env.SERVICES_FRONTEND_URL,
    },
    aws: {
      accessKeyId: process.env.SERVICES_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.SERVICES_AWS_SECRET_ACCESS_KEY,
      region: process.env.SERVICES_AWS_REGION,
      sqs: {
        url: process.env.SERVICES_AWS_SQS_URL,
      },
    },
    email: {
      unsubscribeUrl: process.env.SERVICES_EMAIL_UNSUBSCRIBE_URL,
      from: {
        email: process.env.SERVICES_EMAIL_FROM_EMAIL,
        name: process.env.SERVICES_EMAIL_FROM_NAME,
      },
      limit: {
        hour: process.env.SERVICES_EMAIL_LIMIT_HOUR || 25,
        day: process.env.SERVICES_EMAIL_LIMIT_DAY || 200,
      },
      database: {
        enabled: process.env.SERVICES_EMAIL_DATABASE === 'true',
      },
      aws: {
        enabled: process.env.SERVICES_EMAIL_AWS === 'true',
      },
    },
    worker: {
      type: 'SQS',
    },
  },
}
