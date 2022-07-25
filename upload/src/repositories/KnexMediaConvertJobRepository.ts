import MediaConvertJobRepository, { CreateParameters } from './MediaConvertJobRepository';
import database from '../database';
import logger from '../logger';

class KnexMediaRepository implements MediaConvertJobRepository {
  public async create(params: CreateParameters): Promise<{ id: string, mediaId: string }> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      database.insert(params)
        .into('media_convert_job')
        .then(() => {
          resolve(this.get(params.mediaId));
        })
        .catch(err => reject(err));
    });
  }

  public async get(id: string): Promise<{ id: string, mediaId: string } | undefined> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      database.select()
        .from('media_convert_job')
        .where('id', id)
        .first()
        .then(job => resolve(job))
        .catch(err => reject(err));
    });
  }
}

export default KnexMediaRepository;
