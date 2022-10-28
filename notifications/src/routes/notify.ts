import express from 'express';
import config from '../config';
import logger from '../logger';
import getNotification from '../notifications';
import services from '../services';
import onlyServer from '../middlewares/onlyServer';

const router = express.Router();

const validate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const notification = await getNotification(req.body.name);

    notification.validateParameters(req.body.parameters);
  } catch (error) {
    logger.warn('Notification parameters are not valid!', { error });
    
    return res.status(400).json({
      data: null,
      error: 'Notification parameters are not valid!',
    });
  }

  next();
}

router.post('/', onlyServer, validate, async (req: express.Request, res: express.Response) => {
  const data = req.body;

  const message = {
    MessageBody: JSON.stringify(data),
    QueueUrl: config.services.aws.sqs.url,
  };
  
  try {
    await services.Queue.sendMessage(message);
  } catch (error) {
    logger.error('Could not send message to the queue!', error);
    return res.status(503).json({
      data: null,
      error: 'Could not send message to the queue!',
    });
  }

  res.status(200).json({
    error: null,
    data: null,
  }).end();
});

export default router;
