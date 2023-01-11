import KnexMediaConvertJobRepository from './KnexMediaConvertJobRepository';
import KnexFileRepository from './KnexFileRepository';
import KnexThumbnailRepository from './KnexThumbnailRepository';
import database from '../database';

const container = {
  get MediaConvertJob(): MediaConvertJobRepository {
    return new KnexMediaConvertJobRepository(database);
  },

  get File(): FileRepository {
    return new KnexFileRepository(database);
  },

  get Thumbnail(): ThumbnailRepository {
    return new KnexThumbnailRepository(database);
  },
};

export default container;
