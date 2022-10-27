import Notifications from './Notifications';
import Register from './Register';
import Login from './Login';
import {
  EmailNotification,
  EmailLog,
} from '../repositories';
import config from '../config';

const getNotifications = (name: string): Notifications => {
  switch (name) {
    case 'register': return new Register(config.services.email.unsubscribeUrl, EmailNotification(), EmailLog());
    case 'login': return new Login(config.services.email.unsubscribeUrl, EmailNotification(), EmailLog());
    default:
      throw `Notification ${name} does not exist!`;
  }
}

export default getNotifications;
