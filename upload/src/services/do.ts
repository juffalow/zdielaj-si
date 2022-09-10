import AWS from 'aws-sdk';
import config from '../config';

const spacesEndpoint = new AWS.Endpoint(config.services.do.spaces.endpoint);

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  credentials: {
    accessKeyId: config.services.do.accessKeyId,
    secretAccessKey: config.services.do.secretAccessKey,
  }
});

export default {
  s3,
};
