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
  database: {
    connection: {
      /**
       * @type {string}
       */
      database: process.env.DATABASE_NAME,
      /**
       * @type {string}
       */
      host: process.env.DATABASE_HOST,
      /**
       * @type {string}
       */
      password: process.env.DATABASE_PASSWORD,
      /**
       * @type {string}
       */
      user: process.env.DATABASE_USER,
      /**
       * @type {number}
       */
      port: process.env.DATABASE_PORT,
    },
    /**
     * @type {boolean}
     */
    runMigrations: true,
    /**
     * Set primary key type globally for the whole application
     * @type {string="INT", "UUID"}
     */
    primaryKeyType: process.env.DATABASE_PRIMARY_KEY_TYPE,
    services: {
      user: {
        /**
         * User service uses either local user management where it can handle
         * both INT and UUID primary keys or it supports 3rd party user management
         * systems like AWS Cognito which uses UUID primary keys.
         * 
         * Upload service is not dependend on this user service and it can be used
         * without it.
         * 
         * @link https://github.com/juffalow/user-service
         * @type {string="INT", "UUID"}
         * @default INT
         */
        primaryKeyType: process.env.DATABASE_SERVICES_USER_PRIMARY_KEY_TYPE || 'INT',
      },
      upload: {
        /**
         * @link https://github.com/juffalow/upload-service
         * @type {string="INT", "UUID"}
         * @default INT
         */
        primaryKeyType: process.env.DATABASE_SERVICES_UPLOAD_PRIMARY_KEY_TYPE || 'INT',
      },
    },
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
