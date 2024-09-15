import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import config from '../../config';

const container = {
  get DynamoDB(): DynamoDBClient {
    if (typeof this._dynamoDB === 'undefined') {
      this._dynamoDB = new DynamoDBClient({
        credentials: {
          accessKeyId: config.services.database.accessKeyId,
          secretAccessKey: config.services.database.secretAccessKey,
        },
        endpoint: config.services.database.endpoint,
        region: config.services.database.region,
      });
    }

    return this._dynamoDB;
  },
};

export default container;
