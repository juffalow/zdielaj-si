import { Consumer } from 'sqs-consumer';
import services from './services';
import config from './config';
import logger from './logger';
import jobs from './jobs';
import repositories from './repositories';
import { getDimensions } from './utils/functions';
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

    if ('mimetype' in body && body.mimetype.startsWith('image/')) {
      const { width, height } = getDimensions(body.metadata.height, body.metadata.width, 320, 320);
      const file = await repositories.File.get(body.fileId);

      await jobs.Image.resize(file, width, height);
    }

    if ('mimetype' in body && body.mimetype.startsWith('video/')) {
      const { width: previewWidth, height: previewHeight } = getDimensions(body.metadata.height, body.metadata.width, 720, 1280);
      const { width: thumbnailWidth, height: thumbnailHeight } = getDimensions(body.metadata.height, body.metadata.width, 180, 320);
      const file = await repositories.File.get(body.fileId);
      
      await jobs.Video.convert(file, previewHeight, previewWidth, thumbnailHeight, thumbnailWidth);
    }

    if ('detail' in body && 'jobId' in body.detail) {
      if (body.detail.status === 'COMPLETE') {
        await jobs.Video.complete(body);
      }

      if (body.detail.status === 'ERROR') {
        logger.error('Media convert job ended with error!', body);
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

logger.info('Upload worker is running');

namespace.run(() => {
  app.start();
});
