import { LRUCache } from 'lru-cache';
import CacheRepository from './CacheRepository';
import CompositeRepository from './CompositeRepository';
import DynamoDBRepository from './DynamoDBRepository';
import config from '../../config';
import services from '../../services';

const container = {
  get Cache(): ShortLinkRepository {
    if (typeof this._cache === 'undefined') {
      this._cache = new CacheRepository(new LRUCache<string, ShortLink>({ max: 250 }));
    }

    return this._cache;
  },

  get Composite(): ShortLinkRepository {
    if (typeof this._composite === 'undefined') {
      this._composite = new CompositeRepository(this.DynamoDB, this.Cache);
    }

    return this._composite;
  },

  get DynamoDB(): ShortLinkRepository {
    if (typeof this._dynamoDB === 'undefined') {
      this._dynamoDB = new DynamoDBRepository(services.Database, config.services.database.tableName);
    }

    return this._dynamoDB;
  },
};

export default container;
