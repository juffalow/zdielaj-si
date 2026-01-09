import logger from 'loglevel';
import type { LogLevelDesc } from 'loglevel';
import { getQueryParameter } from '../utils/functions';

const queryLevel = getQueryParameter('loglevel');
const defaultLevel = process.env.NODE_ENV === 'production' ? 'error' : 'debug';

const level = (['error', 'warn', 'info', 'debug'].includes(queryLevel) ? queryLevel : defaultLevel) as LogLevelDesc;

logger.setLevel(level);

export default logger;
