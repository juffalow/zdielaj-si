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
    /*
     * debug | info | warn | error
     */
    level: process.env.LOGGER_LEVEL || 'info',
  },
  jobs: {
    image: {
      /*
       * SHARP
       */
      type: '',
    },
    video: {
      /*
       * AWS
       */
      type: '',
    },
  },
  services: {
    aws: {
      accessKeyId: process.env.SERVICES_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.SERVICES_AWS_SECRET_ACCESS_KEY,
      region: process.env.SERVICES_AWS_REGION,
      s3: {
        bucket: process.env.SERVICES_AWS_S3_BUCKET,
      },
      sqs: {
        url: process.env.SERVICES_AWS_SQS_URL,
      },
      mc: {
        queue: process.env.SERVICES_AWS_MC_QUEUE,
        role: process.env.SERVICES_AWS_MC_ROLE,
        endpoint: process.env.SERVICES_AWS_MC_ENDPOINT,
      },
      cf: {
        url: process.env.SERVICES_AWS_CF_URL,
      },
    },
    do: {
      accessKeyId: process.env.SERVICES_DO_ACCESS_KEY_ID,
      secretAccessKey: process.env.SERVICES_DO_SECRET_ACCESS_KEY,
      spaces: {
        endpoint: process.env.SERVICES_DO_SPACES_ENDPOINT,
        bucket: process.env.SERVICES_DO_SPACES_BUCKET,
        region: process.env.SERVICES_DO_SPACES_REGION,
      },
    },
    storage: {
      /*
       * S3 | SPACES | DISK
       */
      type: process.env.SERVICES_STORAGE_TYPE || 'S3',
    },
    queue: {
      /*
       * SQS
       */
      type: process.env.SERVICES_QUEUE_TYPE || 'SQS',
    },
  },
}
