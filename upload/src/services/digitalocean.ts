import { S3 } from '@aws-sdk/client-s3';
import config from '../config';

export default () => {
  const s3 = new S3({
    endpoint: config.services.do.spaces.endpoint,
    region: config.services.do.spaces.region,
    credentials: {
      accessKeyId: (config as any).services.do.accessKeyId,
      secretAccessKey: (config as any).services.do.secretAccessKey,
    }
  });

  return {
    s3,
  };
}
