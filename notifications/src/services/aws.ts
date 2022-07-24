import AWS from 'aws-sdk';
import config from '../config';

const ses = new AWS.SES(config.services.aws);
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

export default {
  ses,
  sqs,
};
