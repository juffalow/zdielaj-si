import AWS from 'aws-sdk';
import config from '../config';

export default () => {
  const spacesEndpoint = new AWS.Endpoint((config as any).services.do.spaces.endpoint);

  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    credentials: {
      accessKeyId: (config as any).services.do.accessKeyId,
      secretAccessKey: (config as any).services.do.secretAccessKey,
    }
  });

  return {
    s3,
  };
}
