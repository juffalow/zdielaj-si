import album from './album';
import publicProfile from './publicProfile';
import user from './user';

const container = {
  get Album(): AlbumRepository {
    return album.Composite;
  },

  get PublicProfile(): PublicProfileRepository {
    return publicProfile.Composite;
  },

  get User(): UserRepository {
    return user.Composite;
  },
};

export default container;
