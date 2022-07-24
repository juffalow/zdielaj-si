import express from 'express';
import Joi from 'joi';
import aws from '../services/aws';
import config from '../config';
import logger from '../logger';
import onlyServer from '../middlewares/onlyServer';

const router = express.Router();

const schema = Joi.object({ 
  event: Joi.object({
    name: Joi.string().required(),
  }).required(),
  parameters: Joi.object().required().unknown(),
});

const validate = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (typeof error !== 'undefined') {
    return res.status(400).json({
      data: null,
      error,
    });
  }

  next();
}

router.post('/', onlyServer, validate, async (req: express.Request, res: express.Response) => {
  const data = req.body;

  const message = {
    MessageBody: JSON.stringify(data),
    QueueUrl: config.services.aws.queueUrl,
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
