import { Knex } from 'knex';
import logger from '../logger';
import { shouldFilterBy } from '../utils/functions';

class KnexSettingRepository implements Repositories.SettingRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(id: number): Promise<Setting> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('user_notification_notification')
        .where('id', id)
        .first()
        .then(setting => resolve(setting))
        .catch(err => reject(err));
    });
  }

  public async create(params: Repositories.SettingRepository.CreateParameters): Promise<Setting> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      this.database.insert(params)
        .into('user_notification_notification')
        .then((ids) => {
          resolve(this.get(ids[0]));
        })
        .catch(err => reject(err));
    });
  }

  public async find(params: Repositories.SettingRepository.FindParameters): Promise<Setting[]> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      user,
      type,
      notification,
      isEnabled,
      createdAt,
    } = params;

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('user_notification_setting')
        .modify((queryBuilder) => {
          if (shouldFilterBy(user) && shouldFilterBy(user.id)) {
            queryBuilder.where('userId', user.id);
          }

          if (shouldFilterBy(user) && shouldFilterBy(user.email)) {
            queryBuilder.join('user', { 'user.id': 'user_notification_setting.userId' });
            queryBuilder.where('user.email', user.email);
          }

          if (shouldFilterBy(type)) {
            queryBuilder.where('user_notification_setting.type', type);
          }

          if (shouldFilterBy(notification)) {
            queryBuilder.where('user_notification_setting.notification', notification);
          }

          if (shouldFilterBy(isEnabled)) {
            queryBuilder.where('user_notification_setting.isEnabled', isEnabled);
          }

          if (shouldFilterBy(createdAt) && shouldFilterBy(createdAt.from)) {
            queryBuilder.where('user_notification_setting.createdAt', '>=', createdAt.from);
          }

          if (shouldFilterBy(createdAt) && shouldFilterBy(createdAt.to)) {
            queryBuilder.where('user_notification_setting.createdAt', '<=', createdAt.to);
          }
        })
        .then(settings => resolve(settings))
        .catch(err => reject(err));
    });
  }

  public async update(params: Repositories.SettingRepository.UpdateParameters, where: { user: { id: number } }): Promise<Setting> {
    logger.debug(`${this.constructor.name}.update`, params);

    return new Promise((resolve, reject) => {
      this.database.table('user_notification_setting')
        .where('userId', where.user.id)
        .update({
          ...params,
        })
        .then(() => {
          resolve(null);
        })
        .catch((error) => reject(error));
    });
  }
}

export default KnexSettingRepository;
