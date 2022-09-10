import { Knex } from 'knex';
import logger from '../logger';

class KnexMediaRepository implements MediaRepository {
  constructor(
    protected database: Knex
  ) {}

  public async find(albumId: string): Promise<Array<Media>> {
    logger.debug(`${this.constructor.name}.find`, { albumId });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('media')
        .where('albumId', albumId)
        .then(media => resolve(media))
        .catch(err => reject(err));
    });
  }

  public async count(albumId: string): Promise<number> {
    logger.debug(`${this.constructor.name}.count`, { albumId });

    return new Promise((resolve, reject) => {
      this.database.count({ count: '*' })
        .from('media')
        .where('albumId', albumId)
        .first()
        .then((result: any) => resolve(result.count))
        .catch(err => reject(err));
    });
  }

  public async create(albumId: string, mediaId: number): Promise<Media> {
    logger.debug(`${this.constructor.name}.create`, { albumId, mediaId });

    return new Promise((resolve, reject) => {
      this.database.insert({
        albumId,
        mediaId,
      })
      .into('media')
      .then((ids) => {
        resolve({
          id: ids[0],
          albumId,
          mediaId,
        });
      })
      .catch(err => reject(err));
    });
  }
}

export default KnexMediaRepository;
