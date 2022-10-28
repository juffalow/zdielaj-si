import aws from './aws';
import email from './email';
import queue from './queue';
import config from '../config';

const container = {
  get AWS() {
    return aws();
  },

  get Email(): Services.Email {
    const compositeEmail = email.CompositeEmail;

    // if (config.services.email.db.enabled) {
    //   compositeEmail.add(email.DBEmail);
    // }

    compositeEmail.add(email.DBEmail);
    compositeEmail.add(email.AWSEmail);

    return compositeEmail;
  },

  get Queue(): Services.Queue {
    return queue.AWSQueue;
  },
};

export default container;
