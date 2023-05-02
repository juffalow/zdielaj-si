import KnexUserChannelRepository from './KnexUserChannelRepository';
import KnexSettingRepository from './KnexSettingRepository';
import KnexNotificationRepository from './KnexNotificationRepository';
import database from '../database';

const container = {
  get UserChannel(): Repositories.UserChannelRepository {
    return new KnexUserChannelRepository(database);
  },

  get Setting(): Repositories.SettingRepository {
    return new KnexSettingRepository(database);
  },

  get Notification(): Repositories.NotificationRepository {
    return new KnexNotificationRepository(database);
  },
};

export default container;
