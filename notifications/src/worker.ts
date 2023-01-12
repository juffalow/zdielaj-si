import logger from './logger';
import controllers from './controllers';
import namespace from './services/cls';
import services from './services';

const handleMessage = async (body: any) => {
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
}

const worker = services.Worker;
worker.start(handleMessage);
