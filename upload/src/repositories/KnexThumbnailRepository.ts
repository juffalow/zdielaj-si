import ThumbnailRepository, { CreateParameters } from './ThumbnailRepository';
import database from '../database';
import logger from '../logger';

class KnexThumbnailRepository implements ThumbnailRepository {
  public async create(params: CreateParameters): Promise<Thumbnail> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      database.insert(params)
        .into('thumbnail')
        .then((ids) => {
          resolve(this.get(String(ids[0])));
        })
        .catch(err => reject(err));
    });
  }

  public async get(id: string): Promise<Thumbnail | undefined> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      database.select()
        .from('thumbnail')
        .where('id', id)
        .first()
        .then(thumbnail => resolve(thumbnail))
        .catch(err => reject(err));
    });
  }

  public async getAll(mediaId: string): Promise<Thumbnail[] | undefined> {
    logger.debug(`${this.constructor.name}.getAll`, { mediaId });

    return new Promise((resolve, reject) => {
      database.select()
        .from('thumbnail')
        .where('mediaId', mediaId)
        .then(thumbnails => resolve(thumbnails))
        .catch(err => reject(err));
    });
  }
}

export default KnexThumbnailRepository;
