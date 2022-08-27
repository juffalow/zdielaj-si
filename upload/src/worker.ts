import { Consumer } from 'sqs-consumer';
import aws from './services/aws';
import config from './config';
import logger from './logger';
import resizeImage from './worker/resizeImage';
import convertVideo from './worker/convertVideo';
import mediaConvertJob from './worker/mediaConvertJob';
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
      const { width, height } = getDimensions(body.height, body.width, 320, 320);
      await resizeImage.resize(body.mediaId, width, height);
    }

    if ('mimetype' in body && body.mimetype.startsWith('video/')) {
      const { width: previewWidth, height: previewHeight } = getDimensions(body.height, body.width, 720, 1280);
      const { width: thumbnailWidth, height: thumbnailHeight } = getDimensions(body.height, body.width, 180, 320);
      await convertVideo.convert(body.mediaId, previewHeight, previewWidth, thumbnailHeight, thumbnailWidth);
    }

    if ('detail' in body && 'jobId' in body.detail) {
      if (body.detail.status === 'COMPLETE') {
        await mediaConvertJob.complete(body);
      }
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

logger.info('Upload worker is running');
app.start();
