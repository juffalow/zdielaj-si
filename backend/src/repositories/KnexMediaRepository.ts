import { Knex } from 'knex';
import logger from '../logger';
import { shouldFilterBy } from '../utils/functions';

class KnexMediaRepository implements MediaRepository {
  constructor(
    protected database: Knex
  ) {}

  public async find(params: MediaRepository.FindParameters): Promise<Array<Media>> {
    logger.debug(`${this.constructor.name}.find`, { params });

    const {
      album,
      first,
      after,
    } = params;

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('media')
        .modify((queryBuilder) => {
          if (shouldFilterBy(album) && shouldFilterBy(album.id)) {
            queryBuilder.where('media.albumId', album.id);
          }

          if (shouldFilterBy(first)) {
            queryBuilder.limit(first);
          }

          if (shouldFilterBy(after)) {
            queryBuilder.offset(after);
          }
        })
        .then(media => resolve(media))
        .catch(err => reject(err));
    });
  }

  public async count(params: MediaRepository.CountParameters): Promise<number> {
    logger.debug(`${this.constructor.name}.count`, { params });

    const {
      album,
    } = params;

    return new Promise((resolve, reject) => {
      this.database.count({ count: '*' })
        .from('media')
        .modify((queryBuilder) => {
          if (shouldFilterBy(album) && shouldFilterBy(album.id)) {
            queryBuilder.where('media.albumId', album.id);
          }
        })
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
