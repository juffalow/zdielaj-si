import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import {
  marshall,
  unmarshall,
} from '@aws-sdk/util-dynamodb';
import logger from '../../logger';

class ShortLinkDynamoDBRepository implements ShortLinkRepository {
  constructor(
    protected dynamoDB: DynamoDBClient,
    protected tableName: string,
  ) {}

  public async get(path: string): Promise<ShortLink> {
    logger.debug(`${this.constructor.name}.get`, { path });

    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        id: {
          S: `shortlink#${path}`,
        }
      }
    });
  
    const result = await this.dynamoDB.send(command);

    if ('Item' in result === false) {
      return undefined;
    }

    const item = unmarshall(result.Item);

    return item as ShortLink;
  }

  public async create(params: { path: string, albumId: ID }): Promise<ShortLink> {
    logger.debug(`${this.constructor.name}.create`, { params });

    const item = {
      id: `shortlink#${params.path}`,
      ...params,
      createdAt: new Date().toISOString(),
    };
    
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(item, { removeUndefinedValues: true }),
      ConditionExpression: 'attribute_not_exists(id)',
    });

    const result = await this.dynamoDB.send(command);

    logger.debug('result', result);

    return item as ShortLink;
  }

  public async delete(path: string): Promise<ShortLink> {
    logger.debug(`${this.constructor.name}.delete`, { path });

    throw new Error('Method not implemented!');
  }
}

export default ShortLinkDynamoDBRepository;
