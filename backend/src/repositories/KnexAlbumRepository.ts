import crypto from 'crypto';
import { Knex } from 'knex';
import logger from '../logger';

class KnexAlbumRepository implements AlbumRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(id: string): Promise<Album> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('album')
        .where('id', id)
        .first()
        .then(album => resolve(album))
        .catch(err => reject(err));
    });
  }

  public async create(userId: number = null): Promise<Album> {
    logger.debug(`${this.constructor.name}.create`, { userId });

    return new Promise((resolve) => {
      const id = crypto.randomBytes(4).toString('hex');
      this.database.insert({
        id,
        userId,
      })
      .into('album')
      .then(() => {
        resolve({ id, userId });
      }).catch(err => {
        logger.error('Cannot create album!', { error: { message: err.message, stack: err.stack } });
        return this.create(userId);
      });
    });
  }
}

export default KnexAlbumRepository;
