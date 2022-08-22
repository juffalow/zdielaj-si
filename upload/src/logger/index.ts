import winston, { format } from 'winston';
import cls from 'cls-hooked';
import config from '../config';

const namespace = cls.createNamespace('upload');

const hookedFormat = format((info) => {
  const traceId = namespace.get('traceId');

  if (typeof traceId !== 'undefined') {
    info.traceId = traceId;
  }

  return info;
});

const logger = winston.createLogger({
  level: config.logger.level.toLowerCase(),
  transports: [
    new winston.transports.Console({
      level: config.logger.level.toLowerCase(),
      format: winston.format.combine(
        hookedFormat(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss', alias: '@timestamp' }),
        winston.format.json(),
        winston.format.errors({ stack: true }),
      ),
    }),
  ],
});

export default logger;
