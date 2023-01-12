import SQSWorker from './SQSWorker';
import services from '../';
import config from '../../config';

const container = {
  get SQSWorker(): SQSWorker {
    return new SQSWorker(config.services.aws.sqs.url, services.AWS.sqs);
  },
};

export default container;
