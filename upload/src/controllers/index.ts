import UploadController from './Upload';
import repositories from '../repositories';
import services from '../services';

const container = {
  get Upload() {
    return new UploadController(repositories.Media, services.Storage, services.Queue);
  },
};

export default container;