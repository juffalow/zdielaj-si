import EmailLogRepository, { CreateParameters, FindParameters, CountParameters } from './EmailLogRepository';
import database from '../database';
import logger from '../logger';

class KnexEmailLogRepository implements EmailLogRepository {
  public async get(id: string): Promise<EmailLog> {
    logger.debug('KnexEmailLogRepository.get', { id });

    return new Promise((resolve, reject) => {
      database.select()
        .from('email_log')
        .where('id', id)
        .first()
        .then(emailLog => resolve(emailLog))
        .catch(err => reject(err));
    });
  }

  public async create(params: CreateParameters): Promise<EmailLog> {
    logger.debug('KnexEmailLogRepository.create', params);

    return new Promise((resolve, reject) => {
      database.insert(params)
        .into('email_log')
        .then((ids) => {
          resolve(this.get(String(ids[0])));
        })
        .catch(err => reject(err));
    });
  }

  public async find(params: FindParameters): Promise<EmailLog[]> {
    logger.debug(`${this.constructor.name}.find`, params);

    const {
      email,
      subject,
    } = params;

    return new Promise((resolve, reject) => {
      database.select()
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

  public async count(params: CountParameters): Promise<number> {
    logger.debug(`${this.constructor.name}.count`, { ...params });

    const {
      email,
      subject,
    } = params;

    return database.count({ count: '*' })
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
