import KnexEmailNotificationRepository from './KnexEmailNotificationRepository';
import KnexEmailLogRepository from './KnexEmailLogRepository';
import database from '../database';

const container = {
  get EmailNotification(): EmailNotificationRepository {
    return new KnexEmailNotificationRepository(database);
  },

  get EmailLog(): EmailLogRepository {
    return new KnexEmailLogRepository(database);
  },
};

export default container;
