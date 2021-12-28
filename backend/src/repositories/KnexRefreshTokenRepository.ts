import RefreshTokenRepository from './RefreshTokenRepository';
import database from '../database';

class KnexRefreshTokenRepository implements RefreshTokenRepository {
  public async get(userId: number, token: string): Promise<RefreshToken> {
    return new Promise((resolve, reject) => {
      database.select()
        .from('refreshToken')
        .where('userId', userId)
        .where('token', token)
        .first()
        .then(refreshToken => resolve(refreshToken))
        .catch(err => reject(err));
    });
  }
  
  public async create(userId: number, token: string, expiresAt: number): Promise<RefreshToken> {
    return new Promise((resolve, reject) => {
      database.insert({
        userId,
        token,
        expiresAt: database.raw('DATE_ADD(?, INTERVAL ? SECOND)', [database.fn.now(), expiresAt]),
      })
      .into('refreshToken')
      .then(() => {
        resolve(this.get(userId, token));
      }).catch(err => reject(err));
    });
  }

  public async delete(userId: number, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      database.table('refreshToken')
      .where('userId', userId)
      .where('token', token)
      .delete()
      .then(() => {
        resolve();
      }).catch(err => reject(err));
    });
  }
}

export default KnexRefreshTokenRepository;
