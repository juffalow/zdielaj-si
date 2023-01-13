import KnexUserRepository from './KnexUserRepository';
import KnexUserNotificationSettingRepository from './KnexUserNotificationSettingRepository';
import KnexNotificationRepository from './KnexNotificationRepository';
import database from '../database';

const container = {
  get User(): Repositories.UserRepository {
    return new KnexUserRepository(database);
  },

  get UserNotificationSetting(): Repositories.UserNotificationSettingRepository {
    return new KnexUserNotificationSettingRepository(database);
  },

  get Notification(): Repositories.NotificationRepository {
    return new KnexNotificationRepository(database);
  },
};

export default container;
