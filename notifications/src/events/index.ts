import register from './register';
import logger from '../logger';

const events = (eventName: string) => {
  switch (eventName) {
    case 'register': return register;
    default:
      return (parameter: unknown) => {
        logger.warn('Event does not exist!', { eventName, parameter });
      };
  }
}

export default events;
