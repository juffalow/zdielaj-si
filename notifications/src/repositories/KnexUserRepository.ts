import { Knex } from 'knex';
import logger from '../logger';
import { shouldFilterBy } from '../utils/functions';

class KnexUserRepository implements Repositories.UserRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(id: number): Promise<User | undefined> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('user')
        .where('id', id)
        .first()
        .then(user => {
          resolve(user);
        })
        .catch(err => reject(err));
    });
  }

  public async create(params: Repositories.UserRepository.CreateParameters): Promise<User> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      this.database.insert(params)
        .into('user')
        .then((ids) => {
          resolve(this.get(ids[0]));
        })
        .catch(err => reject(err));
    });
  }

  public async update(params: Repositories.UserRepository.UpdateParameters, where: { id: number }): Promise<User> {
    logger.debug(`${this.constructor.name}.update`, params);

    return new Promise((resolve, reject) => {
      this.database.table('user')
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

  public async find(params: Repositories.UserRepository.FindParameters): Promise<User[]> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      email,
    } = params;

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('user')
        .modify((queryBuilder) => {
          if (shouldFilterBy(email)) {
            queryBuilder.where('email', email);
          }
        })
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  }
}

export default KnexUserRepository;
