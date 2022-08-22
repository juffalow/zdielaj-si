import crypto from 'crypto';
import AlbumRepository from './AlbumRepository';
import database from '../database';
import logger from '../logger';

class KnexAlbumRepository implements AlbumRepository {
  public async get(id: string): Promise<Album> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      database.select()
        .from('album')
        .where('id', id)
        .first()
        .then(album => resolve(album))
        .catch(err => reject(err));
    });
  }

  public async create(userId: number = null): Promise<Album> {
    logger.debug(`${this.constructor.name}.create`, { userId });

    return new Promise((resolve, reject) => {
      const id = crypto.randomBytes(8).toString('hex');
      database.insert({
        id,
        userId,
      })
      .into('album')
      .then(() => {
        resolve({ id, userId });
      }).catch(err => {
        logger.error('Cannot create album!', { error: { message: err.message, stack: err.stack } });
        return this.create();
      });
    });
  }
}

export default KnexAlbumRepository;
