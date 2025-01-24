import winston, { format } from 'winston';
import services from '../services';
import config from '../config';

const hookedFormat = format((info) => {
  const traceId = services.Trace.getTraceId();

  if (typeof traceId === 'undefined') {
    return info;
  }

  info.traceId = traceId;

  return info;
});

const redactedFormat = format((info) => {
  if (typeof info['password'] !== 'undefined') {
    info.password = '******';
  }

  if (typeof info['user'] !== 'undefined' && typeof info['user']['token'] !== 'undefined') {
    info['user']['token'] = info['user']['token'].substring(0, 5) + '...';
  }

  if (typeof info['email'] !== 'undefined') {
    const [ name, domain ] = (info.email as string).split('@');
    info.email = `${name.substring(0, 2)}${'*'.repeat(name.length - 2)}@${'*'.repeat(domain.length - 2)}${domain.substring(domain.length - 2)}`;
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
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
        winston.format.errors({ stack: true }),
      ),
    }),
  ],
});

export default logger;
