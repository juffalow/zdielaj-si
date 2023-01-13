import FeedbackController from './Feedback';
import NotificationController from './Notification';
import repositories from '../repositories';
import services from '../services';

const container = {
  get Feedback() {
    return new FeedbackController(repositories.User);
  },
  get Notification() {
    return new NotificationController(repositories.User, services.Queue);
  },
};

export default container;
