import { Knex } from 'knex';
import logger from '../logger';

class KnexFileRepository implements FileRepository {
  constructor(
    protected database: Knex
  ) {}

  public async create(params: FileRepository.CreateParameters): Promise<File> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      this.database.insert(params)
        .into('file')
        .then((ids) => {
          resolve(this.get(String(ids[0])));
        })
        .catch(err => reject(err));
    });
  }

  public async get(id: string): Promise<File | undefined> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('file')
        .where('id', id)
        .first()
        .then(file => resolve(file))
        .catch(err => reject(err));
    });
  }
}

export default KnexFileRepository;
