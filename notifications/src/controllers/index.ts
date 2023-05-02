import FeedbackController from './Feedback';
import NotificationController from './Notification';
import SettingsController from './Settings';
import repositories from '../repositories';
import services from '../services';

const container = {
  get Feedback() {
    return new FeedbackController(repositories.UserChannel);
  },
  get Notification() {
    return new NotificationController(repositories.UserChannel, services.Queue);
  },
  get Settings() {
    return new SettingsController(repositories.UserChannel, repositories.Setting);
  },
};

export default container;
