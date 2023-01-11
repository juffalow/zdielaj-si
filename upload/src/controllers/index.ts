import UploadController from './Upload';
import FilesController from './Files';
import repositories from '../repositories';
import services from '../services';

const container = {
  get Upload() {
    return new UploadController(repositories.File, services.Storage, services.Queue);
  },

  get Files() {
    return new FilesController(repositories.File, repositories.Thumbnail, services.Storage);
  },
};

export default container;
