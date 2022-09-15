import AWSQueue from './AWSQueue';
import services from '../';
import config from '../../config';

const container = {
  get AWSQueue() {
    return new AWSQueue(
      services.AWS.sqs,
      config.services.aws.sqs.url
    );
  },
};

export default container;
