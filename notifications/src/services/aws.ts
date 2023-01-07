import { SES } from '@aws-sdk/client-ses';
import { SQSClient } from '@aws-sdk/client-sqs';
import config from '../config';

export default () => {
  const ses = new SES({
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
    },
  });

  return {
    ses,
    sqs,
  };
}
