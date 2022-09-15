import AWS from 'aws-sdk';
import config from '../config';

export default () => {
  const s3 = new AWS.S3(config.services.aws);
  const sqs = new AWS.SQS({
    apiVersion: '2012-11-05',
    region: config.services.aws.region,
    accessKeyId: config.services.aws.accessKeyId,
    secretAccessKey: config.services.aws.secretAccessKey,
    credentials: {
      accessKeyId: config.services.aws.accessKeyId,
      secretAccessKey: config.services.aws.secretAccessKey,
    }
  });
  const mc = new AWS.MediaConvert({
    apiVersion: '2017-08-29',
    region: config.services.aws.region,
    endpoint: 'https://6qbvwvyqc.mediaconvert.eu-central-1.amazonaws.com',
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

