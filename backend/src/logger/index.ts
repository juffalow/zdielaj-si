import winston, { format } from 'winston';
import cls from 'cls-hooked';
import config from '../config';

const hookedFormat = format((info) => {
  const namespace = cls.getNamespace('core');
  const traceId = namespace.get('traceId');

  if (typeof traceId !== 'undefined') {
    info.traceId = traceId;
  }

  return info;
});

const redactedFormat = format((info) => {
  if (typeof info['password'] !== 'undefined') {
    info.password = '******';
  }

  if (typeof info['email'] !== 'undefined') {
    info.email = info.email.substring(0, 2) + '***@******';
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
        redactedFormat(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss', alias: '@timestamp' }),
        winston.format.json(),
        winston.format.errors({ stack: true }),
      ),
    }),
  ],
});

export default logger;
