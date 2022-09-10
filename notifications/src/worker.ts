import { Consumer } from 'sqs-consumer';
import aws from './services/aws';
import config from './config';
import logger from './logger';
import getNotifications from './notifications';
import namespace from './services/cls';

const app = Consumer.create({
  queueUrl: config.services.aws.queueUrl,
  handleMessage: async (message) => {
    const body = JSON.parse(message.Body);

    logger.debug('Received message from queue!', { body });

    if ('traceId' in body) {
      namespace.set('traceId', body.traceId);
    } else {
      logger.warn('Trace ID is not present in message body!');
    }

    try {
      await getNotifications(body.name).notify(body.parameters);
    } catch (err) {
      logger.error('Could not sent notification!', err);
    }
  },
  sqs: aws.sqs,
});

app.on('error', (err) => {
  logger.error(err.message, err);
});

app.on('processing_error', (err) => {
  logger.error(err.message, err);
});

logger.info('Notifications worker is running');
app.start();
