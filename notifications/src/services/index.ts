import aws from './aws';
import email from './email';
import queue from './queue';
import worker from './worker';
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

  get Worker(): Services.Worker {
    switch (config.services.worker.type) {
      case 'SQS':
        return worker.SQSWorker;
    }
  }
};

export default container;
