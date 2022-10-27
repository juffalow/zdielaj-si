import SharpImage from './SharpImage';
import services from '../../services';
import repositories from '../../repositories';

const container = {
  get SharpImage() {
    return new SharpImage(services.Storage, repositories.Thumbnail);
  },
};

export default container;
