import Notifications from './Notifications';
import Register from './Register';
import EmailNotificationRepository from '../repositories/KnexEmailNotificationRepository';
import EmailLogRepository from '../repositories/KnexEmailLogRepository';

const getNotifications = (name: string): Notifications => {
  switch (name) {
    case 'register': return new Register(new EmailNotificationRepository(), new EmailLogRepository());
    default:
      throw 'Template does not exist!';
  }
}

export default getNotifications;
