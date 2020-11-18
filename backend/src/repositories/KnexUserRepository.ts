import bcrypt from 'bcrypt';
import UserRepository from './UserRepository';
import database from '../database';

class KnexUserRepository implements UserRepository {
  getByEmail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      database.select()
        .from('user')
        .where('email', email)
        .first()
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  }

  public async create(name: string, email: string, password: string): Promise<User> {
    const passwordHash: string = bcrypt.hashSync(password, 10);
    return new Promise((resolve, reject) => {
      database.insert({
        name,
        email,
        password: passwordHash,
      })
      .into('user')
      .then(() => {
        resolve(this.getByEmail(email));
      }).catch(err => reject(err));
    });
  }
}

export default KnexUserRepository;
