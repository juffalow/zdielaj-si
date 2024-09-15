import Notifications from './notifications';
import Upload from './upload';
import token from './token';
import Database from './database';
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
};

export default container;
