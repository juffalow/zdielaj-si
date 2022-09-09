import { Knex } from 'knex';
import logger from '../logger';

class KnexMediaRepository implements MediaRepository {
  constructor(
    protected database: Knex
  ) {}

  public async create(params: MediaRepository.CreateParameters): Promise<Media> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      this.database.insert(params)
        .into('media')
        .then((ids) => {
          resolve(this.get(String(ids[0])));
        })
        .catch(err => reject(err));
    });
  }

  public async get(id: string): Promise<Media | undefined> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('media')
        .where('id', id)
        .first()
        .then(media => resolve(media))
        .catch(err => reject(err));
    });
  }
}

export default KnexMediaRepository;
