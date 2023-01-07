import { S3Client } from '@aws-sdk/client-s3';
import { SQSClient } from '@aws-sdk/client-sqs';
import { MediaConvertClient } from '@aws-sdk/client-mediaconvert';
import config from '../config';

export default () => {
  const s3 = new S3Client({
    region: config.services.aws.region,
    credentials: {
      accessKeyId: config.services.aws.accessKeyId,
      secretAccessKey: config.services.aws.secretAccessKey,
    },
  });
  const sqs = new SQSClient({
    apiVersion: '2012-11-05',
    region: config.services.aws.region,
    credentials: {
      accessKeyId: config.services.aws.accessKeyId,
      secretAccessKey: config.services.aws.secretAccessKey,
    }
  });
  const mc = new MediaConvertClient({
    apiVersion: '2017-08-29',
    region: config.services.aws.region,
    endpoint: config.services.aws.mc.endpoint,
    credentials: {
      accessKeyId: config.services.aws.accessKeyId,
      secretAccessKey: config.services.aws.secretAccessKey,
    }
  });

  return {
    s3,
    sqs,
    mc,
  }
}

