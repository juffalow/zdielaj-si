import KnexAlbumRepository from './KnexAlbumRepository';
import KnexMediaRepository from './KnexMediaRepository';
import database from '../database';

const container = {
  get Album(): AlbumRepository {
    return new KnexAlbumRepository(database);
  },

  get Media(): MediaRepository {
    return new KnexMediaRepository(database);
  },
};

export default container;
