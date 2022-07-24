import EmailNotificationRepository, { CreateParameters, FindParameters } from './EmailNotificationRepository';
import database from '../database';
import logger from '../logger';

class KnexEmailNotificationRepository implements EmailNotificationRepository {
  public async get(email: string, event: string): Promise<EmailNotification | undefined> {
    logger.debug('KnexEmailNotificationRepository.get', { email, event });

    return new Promise((resolve, reject) => {
      database.select()
        .from('email_notification')
        .where('email', email)
        .where('event', event)
        .first()
        .then(emailNotification => {
          if (typeof emailNotification === 'undefined') {
            resolve(undefined);
          }

          resolve({ ...emailNotification, isEnabled: emailNotification === 1 })
        })
        .catch(err => reject(err));
    });
  }

  public async create(params: CreateParameters): Promise<EmailNotification> {
    logger.debug('KnexEmailNotificationRepository.create', params);

    return new Promise((resolve, reject) => {
      database.insert(params)
        .into('email_notification')
        .then(() => {
          resolve(this.get(params.email, params.event));
        })
        .catch(err => reject(err));
    });
  }

  public async find(params: FindParameters): Promise<EmailNotification[]> {
    logger.debug('KnexEmailNotificationRepository.find', params);

    return new Promise((resolve, reject) => {
      database.select()
        .from('email_notification')
        .then(emailNotifications => resolve(emailNotifications))
        .catch(err => reject(err));
    });
  }
}

export default KnexEmailNotificationRepository;
