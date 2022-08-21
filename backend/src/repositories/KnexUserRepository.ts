import { Knex } from 'knex';
import logger from '../logger';

class KnexUserRepository implements UserRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(id: number): Promise<User> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      this. database.select()
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
      this.database.select()
        .from('user')
        .where('email', email)
        .first()
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  }

  public async create(params: UserRepository.CreateParameters): Promise<User> {
    logger.debug(`${this.constructor.name}.create`, { params });

    return new Promise((resolve, reject) => {
      this.database.insert(params)
        .into('user')
        .then(() => {
          resolve(this.getByEmail(params.email));
        }).catch(err => reject(err));
    });
  }

  public async update(params: UserRepository.UpdateParameters): Promise<User> {
    logger.debug(`${this.constructor.name}.update`, { params });

    const { id, ...data } = params;
    return new Promise((resolve, reject) => {
      this.database.table('user')
        .update(data)
        .where('id', id)
        .then(() => {
          resolve(this.get(params.id));
        }).catch(err => reject(err));
    });
  }

  public async detele(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      database.table('user')
        .where('id', id)
        .del()
        .then(() => {
          resolve(true)
        }).catch(err => reject(err))
    })
  }
}

export default KnexUserRepository;
