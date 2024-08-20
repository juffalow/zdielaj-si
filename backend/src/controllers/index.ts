import AlbumsController from './Albums';
import NotificationsController from './Notifications';
import PublicProfilesController from './PublicProfiles';
import repositories from '../repositories';
import services from '../services';

const container = {
  get Albums() {
    return new AlbumsController(repositories.Album, repositories.Media, services.Upload);
  },

  get Notifications() {
    return new NotificationsController(services.Notifications);
  },

  get PublicProfile() {
    return new PublicProfilesController(repositories.PublicProfile);
  }
};

export default container;
