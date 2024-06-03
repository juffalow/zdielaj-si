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

    return this.database.select()
      .from('album_media')
      .modify((queryBuilder) => {
        if (shouldFilterBy(album) && shouldFilterBy(album.id)) {
          queryBuilder.where('album_media.albumId', album.id);
        }

        if (shouldFilterBy(first)) {
          queryBuilder.limit(first);
        }

        if (shouldFilterBy(after)) {
          queryBuilder.offset(after);
        }
      });
  }

  public async count(params: MediaRepository.CountParameters): Promise<number> {
    logger.debug(`${this.constructor.name}.count`, { params });

    const {
      album,
    } = params;

    return this.database.count({ count: '*' })
      .from('album_media')
      .modify((queryBuilder) => {
        if (shouldFilterBy(album) && shouldFilterBy(album.id)) {
          queryBuilder.where('album_media.albumId', album.id);
        }
      })
      .first()
      .then((result: any) => result.count);
  }

  public async create(albumId: ID, fileId: ID): Promise<Media> {
    logger.debug(`${this.constructor.name}.create`, { albumId, fileId });

    return this.database.insert({
      albumId,
      fileId,
    })
    .into('album_media')
    .then((ids) => ({
      id: ids[0],
      albumId,
      fileId,
    }));
  }
}

export default KnexMediaRepository;
