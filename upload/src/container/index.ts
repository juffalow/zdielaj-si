import Container from './Container';
import UploadController from '../controllers/Upload';
import KnexMediaRepository from '../repositories/KnexMediaRepository';
import KnexThumbnailRepository from '../repositories/KnexThumbnailRepository';
import KnexMediaConvertJobRepository from '../repositories/KnexMediaConvertJobRepository';
import aws from '../services/aws';
import S3Storage from '../services/storage/S3Storage';
import AWSQueue from '../services/queue/AWSQueue';
import database from '../database';
import config from '../config';
import logger from '../logger';

const container = new Container();

container.register('controller.upload', (c) => {
  return new UploadController(
    c.get('repository.media'),
    c.get('service.storage'),
    c.get('service.queue')
  );
});

container.register('repository.media', (c) => {
  return new KnexMediaRepository(
    c.get('service.database')
  );
});

container.register('repository.thumbnail', (c) => {
  return new KnexThumbnailRepository(
    c.get('service.database')
  );
});

container.register('repository.mediaConvertJob', (c) => {
  return new KnexMediaConvertJobRepository(
    c.get('service.database')
  );
});

container.register('service.database', () => {
  logger.debug('Creating Knex object...');

  return database;
});

container.register('service.storage', () => {
  logger.debug('Creating S3Storage object...');

  return new S3Storage(
    aws.s3,
    config.services.aws.s3.bucket,
    config.services.aws.region,
    config.services.aws.cf.url
  );
});

container.register('service.queue', () => {
  logger.debug('Creating AWSQueue object...');

  return new AWSQueue(
    aws.sqs,
    config.services.aws.sqs.url,
  );
});

export default container;
