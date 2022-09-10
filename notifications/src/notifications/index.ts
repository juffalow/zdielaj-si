import Notifications from './Notifications';
import Register from './Register';
import {
  EmailNotification,
  EmailLog,
} from '../repositories';

const getNotifications = (name: string): Notifications => {
  switch (name) {
    case 'register': return new Register(EmailNotification(), EmailLog());
    default:
      throw 'Template does not exist!';
  }
}

export default getNotifications;
