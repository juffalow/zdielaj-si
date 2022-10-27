import winston, { format } from 'winston';
import namespace from '../services/cls';
import config from '../config';

/**
 * When you set values in continuation-local storage, those values
 * are accessible until all functions called from the original
 * function – synchronously or asynchronously – have finished executing.
 * 
 * In this case it is used for logging - set a traceId (random string)
 * used to track all logged messages that belong to one request.
 * 
 * @see https://github.com/jeff-lewis/cls-hooked
 * @see https://www.npmjs.com/package/cls-hooked
 */
const hookedFormat = format((info) => {
  const traceId = namespace.get('traceId');

  if (typeof traceId !== 'undefined') {
    info.traceId = traceId;
  }

  return info;
});

/**
 * 
 * @see https://github.com/winstonjs/winston
 * @see https://www.npmjs.com/package/winston
 */
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
