import Disk from './Disk';
import S3Storage from './S3Storage';
import Spaces from './Spaces';
import services from '../';
import config from '../../config';
import logger from '../../logger';

const container = {
  get Disk() {
    if ('directory' in config.services.storage === false) {
      logger.error('Storage directory is not specified!');
      throw new Error('Storage directory is not specified!');
    }

    return new Disk(
      (config.services.storage as any).directory,
      'http://localhost:3012'
    );
  },

  get S3() {
    return new S3Storage(
      services.AWS.s3,
      (config as any).services.aws.s3.bucket,
      (config as any).services.aws.region,
      (config as any).services.aws.cf.url
    );
  },
  
  get Spaces() {
    return new Spaces(
      services.DigitalOcean.s3,
      (config as any).services.do.spaces.bucket,
      (config as any).services.do.spaces.region,
    );
  }
};

export default container;
