import { Knex } from 'knex';
import logger from '../logger';
import { shouldFilterBy } from '../utils/functions';

class KnexAlbumRepository implements AlbumRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(id: number): Promise<Album> {
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

  public async create(userId: number = null, hash: string): Promise<Album> {
    logger.debug(`${this.constructor.name}.create`, { userId });

    return new Promise((resolve, reject) => {
      this.database.insert({
        userId,
        hash,
      })
      .into('album')
      .then((ids) => {
        resolve(this.get(ids[0]));
      }).catch(err => {
        reject(err);
      });
    });
  }

  public async find(params: AlbumRepository.FindParameters): Promise<Album[]> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      user,
      hash,
    } = params;

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('album')
        .modify((queryBuilder) => {
          if (shouldFilterBy(user) && shouldFilterBy(user.id)) {
            queryBuilder.where('album.userId', user.id);
          }

          if (shouldFilterBy(hash)) {
            queryBuilder.where('album.hash', hash);
          }
        })
        .then(albums => resolve(albums))
        .catch(err => reject(err));
    });
  }
}

export default KnexAlbumRepository;
