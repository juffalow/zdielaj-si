import { Knex } from 'knex';
import logger from '../logger';
import { shouldFilterBy } from '../utils/functions';

class KnexNotificationRepository implements Repositories.NotificationRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(id: number): Promise<UserNotification> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('notification')
        .where('id', id)
        .first()
        .then(notification => resolve(notification))
        .catch(err => reject(err));
    });
  }

  public async create(params: Repositories.NotificationRepository.CreateParameters): Promise<UserNotification> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      this.database.insert(params)
        .into('notification')
        .then((ids) => {
          resolve(this.get(ids[0]));
        })
        .catch(err => reject(err));
    });
  }

  public async find(params: Repositories.NotificationRepository.FindParameters): Promise<UserNotification[]> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      user,
      type,
      subject,
      status,
      createdAt,
    } = params;

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('notification')
        .modify((queryBuilder) => {
          if (shouldFilterBy(user) && shouldFilterBy(user.id)) {
            queryBuilder.where('userId', user.id);
          }

          if (shouldFilterBy(user) && shouldFilterBy(user.email)) {
            queryBuilder.join('user', { 'user.id': 'notification.userId' });
            queryBuilder.where('user.email', user.email);
          }

          if (shouldFilterBy(type)) {
            queryBuilder.where('notification.type', type);
          }

          if (shouldFilterBy(subject)) {
            queryBuilder.where('notification.subject', subject);
          }

          if (shouldFilterBy(status)) {
            queryBuilder.where('notification.status', status);
          }

          if (shouldFilterBy(createdAt) && shouldFilterBy(createdAt.from)) {
            queryBuilder.where('notification.createdAt', '>=', createdAt.from);
          }

          if (shouldFilterBy(createdAt) && shouldFilterBy(createdAt.to)) {
            queryBuilder.where('notification.createdAt', '<=', createdAt.to);
          }
        })
        .then(notifications => resolve(notifications))
        .catch(err => reject(err));
    });
  }

  public async count(params: Repositories.NotificationRepository.CountParameters): Promise<number> {
    logger.debug(`${this.constructor.name}.count`, params);

    const {
      user,
      type,
      subject,
      status,
      createdAt,
    } = params;

    return new Promise((resolve, reject) => {
      this.database.count({ count: '*' })
        .from('notification')
        .modify((queryBuilder) => {
          if (shouldFilterBy(user) && shouldFilterBy(user.id)) {
            queryBuilder.where('userId', user.id);
          }

          if (shouldFilterBy(user) && shouldFilterBy(user.email)) {
            queryBuilder.join('user', { 'user.id': 'notification.userId' });
            queryBuilder.where('user.email', user.email);
          }

          if (shouldFilterBy(type)) {
            queryBuilder.where('notification.type', type);
          }

          if (shouldFilterBy(subject)) {
            queryBuilder.where('notification.subject', subject);
          }

          if (shouldFilterBy(status)) {
            queryBuilder.where('notification.status', status);
          }

          if (shouldFilterBy(createdAt) && shouldFilterBy(createdAt.from)) {
            queryBuilder.where('notification.createdAt', '>=', createdAt.from);
          }

          if (shouldFilterBy(createdAt) && shouldFilterBy(createdAt.to)) {
            queryBuilder.where('notification.createdAt', '<=', createdAt.to);
          }
        })
        .first()
        .then(result => resolve(result.count))
        .catch(err => reject(err));
    });
  }
}

export default KnexNotificationRepository;
