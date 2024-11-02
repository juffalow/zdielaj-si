export default {
  /**
   * @type {number}
   * @default 3010
   */
  port: process.env.PORT || 3010,
  /**
   * @type {string="DEVELOPMENT", "PRODUCTION"}
   * @default DEVELOPMENT
   */
  env: process.env.ENV || 'DEVELOPMENT',
  /**
   * @type {string}
   */
  domain: process.env.DOMAIN || 'localhost',
  allowedOrigins: [
    'http://localhost:3000',
    'https://zdielaj.si',
  ],
  jwt: {
    secret: process.env.JWT_SECRET || '',
    ttl: 15 * 60,
  },
  logger: {
    /**
     * Supported values:
     * debug
     * info
     * warn
     * error
     * @type {string="debug", "info", "warn", "error"}
     */
    level: process.env.LOGGER_LEVEL || 'info',
  },
  services: {
    aws: {
      cognito: {
        region: process.env.SERVICES_AWS_COGNITO_REGION,
        poolId: process.env.SERVICES_AWS_COGNITO_POOL_ID,
        clientId: process.env.SERVICES_AWS_COGNITO_CLIENT_ID,
        clientSecret: process.env.SERVICES_AWS_COGNITO_CLIENT_SECRET,
      },
    },
    database: {
      tableName: process.env.SERVICES_DATABASE_TABLE_NAME,
      accessKeyId: process.env.SERVICES_DATABASE_ACCESS_KEY_ID,
      secretAccessKey: process.env.SERVICES_DATABASE_SECRET_ACCESS_KEY,
      /**
       * @type {string}
       * @example eu-central-1
       */
      region: process.env.SERVICES_DATABASE_REGION,
      /**
       * This value is used for development purposes.
       * @type {string}
       * @example http://dynamodb-zdielajsi:8000
       */
      endpoint: process.env.SERVICES_DATABASE_ENDPOINT,
    },
    /**
     * Access token is used to authorize user to do some actions.
     */
    token: {
      /**
       * @type {string="JWT", "AWS_COGNITO"}
       */
      type: process.env.SERVICES_TOKEN_TYPE,
      /**
       * @type {string}
       */
      secret: process.env.SERVICES_TOKEN_SECRET,
    },
    frontend: {
      /**
       * Public URL for frontend application.
       * @type {string}
       * @example http://localhost:3000
       */
      url: process.env.SERVICES_FRONTEND_URL || 'http://localhost:3000',
    },
    upload: {
      /**
       * Upload service URL.
       * Recommended: create docker network and use private URL for direct and faster communication.
       * @type {string}
       * @example http://upload:3010
       */
      url: process.env.SERVICES_UPLOAD_URL || 'http://upload:3010',
    },
    user: {
      /**
       * User service URL.
       * Recommended: create docker network and use private URL for direct and faster communication.
       * @type {string}
       * @example http://upload:3010
       */
      url: process.env.SERVICES_USER_URL || 'http://user:3010',
    },
    notifications: {
      /**
       * Notifications service URL.
       * Recommended: create docker network and use private URL for direct and faster communication.
       * @type {string}
       * @example http://notifications:3010
       */
      url: process.env.SERVICES_NOTIFICATIONS_URL || 'http://notifications:3010',
    },
  },
}
