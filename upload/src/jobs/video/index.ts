import AWSVideo from './AWSVideo';
import config from '../../config';
import repositories from '../../repositories';
import services from '../../services';

const container = {
  get AWSVideo() {
    return new AWSVideo(
      config.services.aws.mc.queue,
      config.services.aws.mc.role,
      config.services.aws.s3.bucket,
      services.AWS.mc,
      repositories.MediaConvertJob,
      repositories.Thumbnail,
    );
  },
};

export default container;
