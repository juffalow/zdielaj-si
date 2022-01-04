import UserRepository, { CreateParameters, UpdateParameters } from './UserRepository';
import database from '../database';

class KnexUserRepository implements UserRepository {
  public async get(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      database.select()
        .from('user')
        .where('id', id)
        .first()
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  }

  public async getByEmail(email: string): Promise<User> {
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
    return new Promise((resolve, reject) => {
      database.insert(params)
        .into('user')
        .then(() => {
          resolve(this.getByEmail(params.email));
        }).catch(err => reject(err));
    });
  }

  public async update(params: UpdateParameters): Promise<User> {
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
