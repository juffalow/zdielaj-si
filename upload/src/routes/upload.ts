import express from 'express';
import multer from 'multer';
import {
  base64encode,
  fileFilter,
  processFile,
} from '../utils/functions';
import MediaRepository from '../repositories/KnexMediaRepository';
import S3Storage from '../storage/S3Storage';
import logger from '../logger';
import config from '../config';
import aws from '../services/aws';

const upload = multer({ fileFilter });

const router = express.Router();

router.post('/', upload.single('image'), async (req: express.Request, res: express.Response) => {
  const mediaRepository = new MediaRepository();
  const storage = new S3Storage();
  const directory = base64encode((new Date).toISOString().split('T')[0]);

  const path = await processFile(storage, directory, (req as any).file);

  const media = await mediaRepository.create({
    path: path,
    mimetype: (req as any).file.mimetype,
    size: (req as any).file.size
  });

  const messageData = {
    mediaId: media.id,
    mimetype: media.mimetype,
  }

  const message = {
    MessageBody: JSON.stringify(messageData),
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
    data: {
      media,
    },
  }).end();
});

export default router;
