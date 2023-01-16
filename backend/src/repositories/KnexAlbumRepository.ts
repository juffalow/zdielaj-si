import crypto from 'crypto';
import { Knex } from 'knex';
import logger from '../logger';
import { shouldFilterBy } from '../utils/functions';

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

  public async find(params: AlbumRepository.FindParameters): Promise<Album[]> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      user,
    } = params;

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('album')
        .modify((queryBuilder) => {
          if (shouldFilterBy(user) && shouldFilterBy(user.id)) {
            queryBuilder.where('album.userId', user.id);
          }
        })
        .then(albums => resolve(albums))
        .catch(err => reject(err));
    });
  }
}

export default KnexAlbumRepository;
