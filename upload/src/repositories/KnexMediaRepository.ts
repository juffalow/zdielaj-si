import MediaRepository, { CreateParameters } from './MediaRepository';
import database from '../database';
import logger from '../logger';

class KnexMediaRepository implements MediaRepository {
  public async create(params: CreateParameters): Promise<Media> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      database.insert(params)
        .into('media')
        .then((ids) => {
          resolve(this.get(String(ids[0])));
        })
        .catch(err => reject(err));
    });
  }

  public async get(id: string): Promise<Media | undefined> {
    logger.debug(`${this.constructor.name}.create`, { id });

    return new Promise((resolve, reject) => {
      database.select()
        .from('media')
        .where('id', id)
        .first()
        .then(media => resolve(media))
        .catch(err => reject(err));
    });
  }
}

export default KnexMediaRepository;
