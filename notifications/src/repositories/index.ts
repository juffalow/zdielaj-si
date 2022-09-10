import KnexEmailNotificationRepository from './KnexEmailNotificationRepository';
import KnexEmailLogRepository from './KnexEmailLogRepository';
import database from '../database';

const EmailNotification = (): EmailNotificationRepository => {
  return new KnexEmailNotificationRepository(database);
}

const EmailLog = (): EmailLogRepository => {
  return new KnexEmailLogRepository(database);
}

export {
  EmailNotification,
  EmailLog,
}
