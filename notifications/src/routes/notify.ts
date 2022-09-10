import express from 'express';
import aws from '../services/aws';
import config from '../config';
import logger from '../logger';
import getNotifications from '../notifications';
import onlyServer from '../middlewares/onlyServer';

const router = express.Router();

const validate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { error } = getNotifications(req.body.name).validateParameters(req.body.parameters);

  if (typeof error !== 'undefined') {
    logger.warn('Template parameters are not valid!', { error });
    
    return res.status(400).json({
      data: null,
      error: 'Template parameters are not valid!',
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
    await aws.sqs.sendMessage(message).promise();
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
