import Notifications from './notifications';
import Upload from './upload';
import FetchClient from '../utils/http';
import config from '../config';

const container = {
  get Notifications(): Services.Notifications {
    return new Notifications(new FetchClient(), config.services.notifications.url);
  },

  get Upload(): Services.Upload {
    return new Upload(new FetchClient(), config.services.upload.url);
  },
};

export default container;
