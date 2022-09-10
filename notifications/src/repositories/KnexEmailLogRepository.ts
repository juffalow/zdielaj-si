import { Knex } from 'knex';
import logger from '../logger';

class KnexEmailLogRepository implements EmailLogRepository {
  constructor(
    protected database: Knex
  ) {}

  public async get(id: string): Promise<EmailLog> {
    logger.debug(`${this.constructor.name}.get`, { id });

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('email_log')
        .where('id', id)
        .first()
        .then(emailLog => resolve(emailLog))
        .catch(err => reject(err));
    });
  }

  public async create(params: EmailLogRepository.CreateParameters): Promise<EmailLog> {
    logger.debug(`${this.constructor.name}.create`, params);

    return new Promise((resolve, reject) => {
      this.database.insert(params)
        .into('email_log')
        .then((ids) => {
          resolve(this.get(String(ids[0])));
        })
        .catch(err => reject(err));
    });
  }

  public async find(params: EmailLogRepository.FindParameters): Promise<EmailLog[]> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      email,
      subject,
    } = params;

    return new Promise((resolve, reject) => {
      this.database.select()
        .from('email_log')
        .modify((queryBuilder) => {
          if (typeof email !== 'undefined' && email !== null) {
            queryBuilder.where('email', email);
          }
  
          if (typeof subject !== 'undefined' && subject !== null) {
            queryBuilder.where('subject', subject);
          }
        })
        .then(emailLogs => resolve(emailLogs))
        .catch(err => reject(err));
    });
  }

  public async count(params: EmailLogRepository.CountParameters): Promise<number> {
    logger.debug(`${this.constructor.name}.count`, { ...params });

    const {
      email,
      subject,
    } = params;

    return this.database.count({ count: '*' })
      .from('mail_log')
      .modify((queryBuilder) => {
        if (typeof email !== 'undefined' && email !== null) {
          queryBuilder.where('email', email);
        }

        if (typeof subject !== 'undefined' && subject !== null) {
          queryBuilder.where('subject', subject);
        }
      })
      .first()
      .then((result: any) => result.count);
  }
}

export default KnexEmailLogRepository;
