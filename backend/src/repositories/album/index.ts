import { LRUCache } from 'lru-cache';
import CacheRepository from './CacheRepository';
import CompositeRepository from './CompositeRepository';
import DynamoDBRepository from './DynamoDBRepository';
import config from '../../config';
import services from '../../services';

const container = {
  get Cache(): AlbumRepository {
    if (typeof this._cache === 'undefined') {
      this._cache = new CacheRepository(new LRUCache<ID, Album>({ max: 50 }));
    }

    return this._cache;
  },

  get Composite(): AlbumRepository {
    if (typeof this._composite === 'undefined') {
      this._composite = new CompositeRepository(
        this.DynamoDB,
        this.Cache,
      );
    }

    return this._composite;
  },

  get DynamoDB(): AlbumRepository {
    if (typeof this._dynamoDB === 'undefined') {
      this._dynamoDB = new DynamoDBRepository(services.Database, config.services.database.tableName, config.env === 'DEVELOPMENT');
    }

    return this._dynamoDB;
  },
};

export default container;
