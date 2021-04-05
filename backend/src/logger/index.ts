import winston from 'winston';
import config from '../config';

const logger = winston.createLogger({
  level: config.logger.level.toLowerCase(),
  transports: [
    new winston.transports.Console({
      level: config.logger.level.toLowerCase(),
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss', alias: '@timestamp' }),
        winston.format.json(),
        winston.format.errors({ stack: true }),
      ),
    }),
  ],
});

export default logger;
