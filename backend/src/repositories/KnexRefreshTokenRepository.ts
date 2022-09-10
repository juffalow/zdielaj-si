import { Knex } from 'knex';

class KnexRefreshTokenRepository implements RefreshTokenRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(userId: number, token: string): Promise<RefreshToken> {
    return new Promise((resolve, reject) => {
      this.database.select()
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
      this.database.insert({
        userId,
        token,
        expiresAt: this.database.raw('DATE_ADD(?, INTERVAL ? SECOND)', [this.database.fn.now(), expiresAt]),
      })
      .into('refreshToken')
      .then(() => {
        resolve(this.get(userId, token));
      }).catch(err => reject(err));
    });
  }

  public async delete(userId: number, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.table('refreshToken')
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
