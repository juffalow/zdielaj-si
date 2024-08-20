import { Knex } from 'knex';
import logger from '../logger';
import { shouldFilterBy } from '../utils/functions';

class KnexAlbumRepository implements AlbumRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(id: ID): Promise<Album> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return this.database.select()
      .from('album')
      .where('id', id)
      .first();
  }

  public async create(userId: ID = null, hash: string): Promise<Album> {
    logger.debug(`${this.constructor.name}.create`, { userId });

    return this.database.insert({
        userId,
        hash,
      })
      .into('album')
      .then((ids) => this.get(ids[0]));
  }

  public async find(params: AlbumRepository.FindParameters): Promise<Album[]> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      user,
      publicProfile,
      hash,
    } = params;

    return this.database.select()
      .from('album')
      .modify((queryBuilder) => {
        if (shouldFilterBy(user) && shouldFilterBy(user.id)) {
          queryBuilder.where('album.userId', user.id);
        }

        if (shouldFilterBy(publicProfile) && shouldFilterBy(publicProfile.id)) {
          queryBuilder.where('album.publicProfileId', publicProfile.id);
        }

        if (shouldFilterBy(hash)) {
          queryBuilder.where('album.hash', hash);
        }
      });
  }

  public async count(params: AlbumRepository.CountParameters): Promise<number> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      user,
      publicProfile,
      hash,
    } = params;

    return this.database.count()
      .from('album')
      .modify((queryBuilder) => {
        if (shouldFilterBy(user) && shouldFilterBy(user.id)) {
          queryBuilder.where('album.userId', user.id);
        }

        if (shouldFilterBy(publicProfile) && shouldFilterBy(publicProfile.id)) {
          queryBuilder.where('album.publicProfileId', publicProfile.id);
        }

        if (shouldFilterBy(hash)) {
          queryBuilder.where('album.hash', hash);
        }
      })
      .first()
      .then((result: { count: number }) => result.count);
  }

  public async delete(id: ID): Promise<Album> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    const album = await this.get(id);

    await this.database.table('album').where('id', id).delete();
      
    return album;  
  }
}

export default KnexAlbumRepository;
