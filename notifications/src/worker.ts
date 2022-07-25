import { Consumer } from 'sqs-consumer';
import aws from './services/aws';
import config from './config';
import logger from './logger';
import events from './events';

const app = Consumer.create({
  queueUrl: config.services.aws.queueUrl,
  handleMessage: async (message) => {
    const body = JSON.parse(message.Body);

    logger.debug('Received message from queue!', { body });

    await events(body.event.name).call(null, body.parameters);
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
