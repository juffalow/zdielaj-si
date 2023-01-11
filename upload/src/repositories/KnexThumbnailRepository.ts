import { Knex } from 'knex';
import logger from '../logger';

class KnexThumbnailRepository implements ThumbnailRepository {
  constructor(
    protected database: Knex
  ) {}

  public async create(params: ThumbnailRepository.CreateParameters): Promise<Thumbnail> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      this.database.insert(params)
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
      this.database.select()
        .from('thumbnail')
        .where('id', id)
        .first()
        .then(thumbnail => resolve(thumbnail))
        .catch(err => reject(err));
    });
  }

  public async getAll(fileId: string): Promise<Thumbnail[] | undefined> {
    logger.debug(`${this.constructor.name}.getAll`, { fileId });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('thumbnail')
        .where('fileId', fileId)
        .then(thumbnails => resolve(thumbnails))
        .catch(err => reject(err));
    });
  }
}

export default KnexThumbnailRepository;
