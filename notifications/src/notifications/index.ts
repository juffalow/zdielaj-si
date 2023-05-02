import Notifications from './Notifications';
import repositories from '../repositories';
import services from '../services';
import config from '../config';
import logger from '../logger';

const getNotification = async (name: string): Promise<Notifications> => {
  const filename = './' + name.charAt(0).toUpperCase() + name.slice(1) + '.js';
  
  return import(filename)
    .then(module => module.default)
    .then(ClassDefinition => new ClassDefinition(config.services.email.unsubscribeUrl, repositories.Setting, services.Email))
    .catch(() => {
      logger.error(`Notification ${name} does not exist!`);
      throw `Notification ${name} does not exist!`;
    });
}

export default getNotification;
