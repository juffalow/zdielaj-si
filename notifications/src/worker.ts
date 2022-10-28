import { Consumer } from 'sqs-consumer';
import config from './config';
import logger from './logger';
import getNotification from './notifications';
import services from './services';
import namespace from './services/cls';

const app = Consumer.create({
  queueUrl: config.services.aws.sqs.url,
  handleMessage: async (message) => {
    const body = JSON.parse(message.Body);

    logger.debug('Received message from queue!', { body });

    if ('traceId' in body) {
      namespace.set('traceId', body.traceId);
    } else {
      logger.warn('Trace ID is not present in message body!');
    }

    try {
      const notification = await getNotification(body.name);
      notification.notify(body.parameters);
    } catch (err) {
      logger.error('Could not sent notification!', err);
    }
  },
  sqs: services.AWS.sqs,
});

app.on('error', (err) => {
  logger.error(err.message, err);
});

app.on('processing_error', (err) => {
  logger.error(err.message, err);
});

logger.info('Notifications worker is running');
app.start();
