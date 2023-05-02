import { Knex } from 'knex';
import logger from '../logger';
import { shouldFilterBy } from '../utils/functions';

class KnexUserChannelRepository implements Repositories.UserChannelRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(id: number): Promise<UserChannel | undefined> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('user_channel')
        .where('id', id)
        .first()
        .then(user => {
          resolve(user);
        })
        .catch(err => reject(err));
    });
  }

  public async create(params: Repositories.UserChannelRepository.CreateParameters): Promise<UserChannel> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      this.database.insert(params)
        .into('user_channel')
        .then((ids) => {
          resolve(this.get(ids[0]));
        })
        .catch(err => reject(err));
    });
  }

  public async update(params: Repositories.UserChannelRepository.UpdateParameters, where: { id: number }): Promise<UserChannel> {
    logger.debug(`${this.constructor.name}.update`, params);

    return new Promise((resolve, reject) => {
      this.database.table('user_channel')
        .where('id', where.id)
        .update({
          ...params,
          meta: 'meta' in params ? JSON.stringify(params.meta) : null,
        })
        .then(() => {
          resolve(this.get(where.id));
        })
        .catch((error) => reject(error));
    });
  }

  public async find(params: Repositories.UserChannelRepository.FindParameters): Promise<UserChannel[]> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      user,
      type,
      meta,
      isEnabled,
    } = params;

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('user_channel')
        .modify((queryBuilder) => {
          if (shouldFilterBy(user) && shouldFilterBy(user.id)) {
            queryBuilder.where('userId', user.id);
          }

          if (shouldFilterBy(type)) {
            queryBuilder.where('type', type);
          }

          if (shouldFilterBy(meta)) {
            Object.keys(meta).forEach(key => {
              queryBuilder.whereJsonPath('meta' as never, `$.${key}`, '=', meta[key]);
            });
          }

          if (shouldFilterBy(isEnabled)) {
            queryBuilder.where('isEnabled', isEnabled);
          }
        })
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  }
}

export default KnexUserChannelRepository;
