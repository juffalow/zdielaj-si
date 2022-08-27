import winston, { format } from 'winston';
import namespace from '../services/cls';
import config from '../config';

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
        winston.format.json(),
        winston.format.errors({ stack: true }),
      ),
    }),
  ],
});

export default logger;
