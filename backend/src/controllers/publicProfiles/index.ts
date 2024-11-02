import AlbumsController from './Albums';
import repositories from '../../repositories';
import services from '../../services';

const container = {
  get Albums() {
    return new AlbumsController(repositories.User, repositories.PublicProfile, repositories.Album, services.Upload);
  },
};

export default container;
