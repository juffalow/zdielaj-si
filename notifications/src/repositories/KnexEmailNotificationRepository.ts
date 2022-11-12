import { Knex } from 'knex';
import logger from '../logger';

class KnexEmailNotificationRepository implements EmailNotificationRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(email: string, notification: string): Promise<EmailNotification | undefined> {
    logger.debug(`${this.constructor.name}.get`, { email, notification });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('email_notification')
        .where('email', email)
        .where('notification', notification)
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

  public async create(params: EmailNotificationRepository.CreateParameters): Promise<EmailNotification> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      this.database.insert(params)
        .into('email_notification')
        .then(() => {
          resolve(this.get(params.email, params.notification));
        })
        .catch(err => reject(err));
    });
  }

  public async update(params: EmailNotificationRepository.UpdateParameters): Promise<EmailNotification> {
    logger.debug(`${this.constructor.name}.update`, params);

    return new Promise((resolve, reject) => {
      this.database.table('email_notification')
        .where('email', params.email)
        .where('notification', params.notification)
        .update({ isEnabled: params.isEnabled })
        .then(() => {
          resolve(this.get(params.email, params.notification));
        })
        .catch(err => reject(err));
    });
  }

  public async find(params: EmailNotificationRepository.FindParameters): Promise<EmailNotification[]> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      email,
      notification,
    } = params;

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('email_notification')
        .modify((queryBuilder) => {
          if (typeof email !== 'undefined' && email !== null) {
            queryBuilder.where('email', email);
          }
  
          if (typeof notification !== 'undefined' && notification !== null) {
            queryBuilder.where('notification', notification);
          }
        })
        .then(emailNotifications => resolve(emailNotifications))
        .catch(err => reject(err));
    });
  }
}

export default KnexEmailNotificationRepository;
