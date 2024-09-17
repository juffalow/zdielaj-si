import AlbumsController from './Albums';
import NotificationsController from './Notifications';
import PublicProfilesController from './PublicProfiles';
import Users from './Users';
import repositories from '../repositories';
import services from '../services';

const container = {
  get Albums() {
    return new AlbumsController(repositories.Album, repositories.User, services.Upload);
  },

  get Notifications() {
    return new NotificationsController(services.Notifications);
  },

  get PublicProfile() {
    return new PublicProfilesController(repositories.PublicProfile);
  },

  get Users() {
    return new Users(repositories.User, repositories.Album, services.Upload);
  }
};

export default container;
