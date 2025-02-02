import album from './album';
import publicProfile from './publicProfile';
import user from './user';
import shortLink from './shortLink';

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

  get ShortLink(): ShortLinkRepository {
    return shortLink.Composite;
  },
};

export default container;
