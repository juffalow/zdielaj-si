import { Consumer } from 'sqs-consumer';
import config from './config';
import logger from './logger';
import services from './services';
import controllers from './controllers';
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

    if ('name' in body && 'parameters' in body) {
      await controllers.Notification.send(body.name, body.parameters);
    }

    if ('Message' in body && 'TopicArn' in body) {
      const feedback = JSON.parse(body.Message);
      const feedbackType = feedback.notificationType;

      switch (feedbackType) {
        case 'Bounce':
          for (const mail of feedback.mail.destination) {
            await controllers.Feedback.bounce(mail, feedback.bounce);
          }
          
          break;
        case 'Complaint':
          for (const mail of feedback.mail.destination) {
            await controllers.Feedback.complaint(mail, feedback.complaint);
          }
          
          break;
      }
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
