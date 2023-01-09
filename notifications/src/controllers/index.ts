import FeedbackController from './Feedback';
import NotificationController from './Notification';
import repositories from '../repositories';
import services from '../services';

const container = {
  get Feedback() {
    return new FeedbackController(repositories.EmailNotification);
  },
  get Notification() {
    return new NotificationController(services.Queue, repositories.EmailNotification);
  },
};

export default container;
