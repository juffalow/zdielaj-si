import Notifications from './notifications';
import Upload from './upload';
import User from './user';
import token from './token';
import Database from './database';
import trace from './trace';
import ServiceDiscovery from './serviceDiscovery';
import FetchClient from '../utils/http';
import config from '../config';

const container = {
  get Notifications(): Services.Notifications {
    return new Notifications(new FetchClient(), config.services.notifications.url);
  },

  get Upload(): Services.Upload {
    return new Upload(new FetchClient(), config.services.upload.url);
  },

  get Token(): Services.Token {
    switch (config.services.token.type) {
      case 'JWT':
        return token.JWT;
      case 'AWS_COGNITO':
        return token.AWSCognito;
    }
  },

  get Database(): Services.Database {
    return Database.DynamoDB;
  },

  get User(): Services.User {
    return new User(new FetchClient(), config.services.user.url);
  },

  get Trace(): Services.Trace {
    switch (config.services.trace.type) {
      case 'AWS_XRAY':
        return trace.AWSXRay;
      case 'CLS_HOOKED':
      default:
        return trace.CLSHooked;
    }
  },

  get ServiceDiscovery() {
    return new ServiceDiscovery();
  },
};

export default container;
