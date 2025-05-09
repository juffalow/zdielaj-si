import logger from 'loglevel';
import { LogLevelDesc } from 'loglevel';
import { getQueryParameter } from '../utils/functions';

const queryLevel = getQueryParameter('loglevel');

const level = (['error', 'warn', 'info', 'debug'].includes(queryLevel) ? queryLevel : 'error') as LogLevelDesc;

logger.setLevel(process.env.NODE_ENV === 'production' ? level : 'debug');

export default logger;
