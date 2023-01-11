import KnexAlbumRepository from './KnexAlbumRepository';
import KnexMediaRepository from './KnexMediaRepository';
import KnexRefreshTokenRepository from './KnexRefreshTokenRepository';
import KnexUserRepository from './KnexUserRepository';
import database from '../database';

const container = {
  get Album(): AlbumRepository {
    return new KnexAlbumRepository(database);
  },

  get Media(): MediaRepository {
    return new KnexMediaRepository(database);
  },

  get RefreshToken(): RefreshTokenRepository {
    return new KnexRefreshTokenRepository(database);
  },

  get User(): UserRepository {
    return new KnexUserRepository(database);
  },
};

export default container;
