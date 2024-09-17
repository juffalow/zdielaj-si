// import CacheRepository from './CacheRepository';
import DynamoDBRepository from './DynamoDBRepository';
import config from '../../config';
import services from '../../services';

const container = {
  get DynamoDB(): PublicProfileRepository {
    if (typeof this._dynamoDB === 'undefined') {
      this._dynamoDB = new DynamoDBRepository(services.Database, config.services.database.tableName);
    }

    return this._dynamoDB;
  },
};

export default container;
