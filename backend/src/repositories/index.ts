import KnexAlbumRepository from './KnexAlbumRepository';
import KnexMediaRepository from './KnexMediaRepository';
import KnexPublicProfileRepository from './KnexPublicProfileRepository';
import database from '../database';

const container = {
  get Album(): AlbumRepository {
    return new KnexAlbumRepository(database);
  },

  get Media(): MediaRepository {
    return new KnexMediaRepository(database);
  },

  get PublicProfile(): PublicProfileRepository {
    return new KnexPublicProfileRepository(database);
  }
};

export default container;
