import KnexMediaConvertJobRepository from './KnexMediaConvertJobRepository';
import KnexMediaRepository from './KnexMediaRepository';
import KnexThumbnailRepository from './KnexThumbnailRepository';
import database from '../database';

const container = {
  get MediaConvertJob(): MediaConvertJobRepository {
    return new KnexMediaConvertJobRepository(database);
  },

  get Media(): MediaRepository {
    return new KnexMediaRepository(database);
  },

  get Thumbnail(): ThumbnailRepository {
    return new KnexThumbnailRepository(database);
  },
};

export default container;
