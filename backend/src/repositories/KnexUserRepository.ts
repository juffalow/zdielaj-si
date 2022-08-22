import UserRepository, { CreateParameters, UpdateParameters } from './UserRepository';
import database from '../database';
import logger from '../logger';

class KnexUserRepository implements UserRepository {
  public async get(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      logger.debug(`${this.constructor.name}.get`, { id });

      database.select()
        .from('user')
        .where('id', id)
        .first()
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  }

  public async getByEmail(email: string): Promise<User> {
    logger.debug(`${this.constructor.name}.getByEmail`, { email });

    return new Promise((resolve, reject) => {
      database.select()
        .from('user')
        .where('email', email)
        .first()
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  }

  public async create(params: CreateParameters): Promise<User> {
    logger.debug(`${this.constructor.name}.create`, { params });

    return new Promise((resolve, reject) => {
      database.insert(params)
        .into('user')
        .then(() => {
          resolve(this.getByEmail(params.email));
        }).catch(err => reject(err));
    });
  }

  public async update(params: UpdateParameters): Promise<User> {
    logger.debug(`${this.constructor.name}.update`, { params });

    const { id, ...data } = params;
    return new Promise((resolve, reject) => {
      database.table('user')
        .update(data)
        .where('id', id)
        .then(() => {
          resolve(this.get(params.id));
        }).catch(err => reject(err));
    });
  }
}

export default KnexUserRepository;
