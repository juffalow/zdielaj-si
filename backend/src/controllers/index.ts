import AlbumController from './Album';
import NotificationsController from './Notifications';
import PublicProfileController from './PublicProfile';
import repositories from '../repositories';
import services from '../services';

const container = {
  get Album() {
    return new AlbumController(repositories.Album, repositories.Media, services.Upload);
  },

  get Notifications() {
    return new NotificationsController(services.Notifications);
  },

  get PublicProfile() {
    return new PublicProfileController(repositories.PublicProfile);
  }
};

export default container;
