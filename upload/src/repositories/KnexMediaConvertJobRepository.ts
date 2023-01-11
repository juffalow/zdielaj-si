import { Knex } from 'knex';
import logger from '../logger';

class KnexMediaRepository implements MediaConvertJobRepository {
  constructor(
    protected database: Knex
  ) {}

  public async create(params: MediaConvertJobRepository.CreateParameters): Promise<{ id: string, fileId: string }> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      this.database.insert(params)
        .into('media_convert_job')
        .then(() => {
          resolve(this.get(params.fileId));
        })
        .catch(err => reject(err));
    });
  }

  public async get(id: string): Promise<{ id: string, fileId: string } | undefined> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('media_convert_job')
        .where('id', id)
        .first()
        .then(job => resolve(job))
        .catch(err => reject(err));
    });
  }
}

export default KnexMediaRepository;
