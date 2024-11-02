import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import {
  marshall,
  unmarshall,
} from '@aws-sdk/util-dynamodb';
import logger from '../../logger';

class UserDynamoDBRepository implements UserRepository {
  constructor(
    protected dynamoDB: DynamoDBClient,
    protected tableName: string,
  ) {}

  public async get(id: ID): Promise<User> {
    logger.debug(`${this.constructor.name}.get`, { id });

    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        id: {
          S: id as string,
        }
      }
    });
  
    const result = await this.dynamoDB.send(command);

    if ('Item' in result === false) {
      return undefined;
    }

    const item = unmarshall(result.Item);

    return item as User;
  }

  public async create(params: UserRepository.CreateParameters): Promise<User> {
    logger.debug(`${this.constructor.name}.create`, { params });

    const item = {
      albums: [],
      publicProfiles: [],
      ...params,
      createdAt: new Date().toISOString(),
    };
    
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(item, { removeUndefinedValues: true }),
    });

    const result = await this.dynamoDB.send(command);

    logger.debug('result', result);

    return item as User;
  }

  public async update(params: UserRepository.UpdateParameters, where: { id: ID }): Promise<User> {
    logger.debug(`${this.constructor.name}.update`, { params, where });

    const updateExpression = [];
    const attributeNames = {};
    const attributeValues = {};

    Object.keys(params).forEach(key => {
      if (['albums', 'publicProfileId'].includes(key) === false) return;

      updateExpression.push(`#${key} = :${key}`);
      attributeNames[`#${key}`] = key;
      if (typeof params[key] === 'string') attributeValues[`:${key}`] = { S: params[key] };
      if (typeof params[key] === 'object' && Array.isArray(params[key]) === false) attributeValues[`:${key}`] = { M: marshall(params[key]) };
      if (typeof params[key] === 'object' && Array.isArray(params[key])) attributeValues[`:${key}`] = { L: marshall(params[key]) };
    });

    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: {
        id: {
          S: where.id as string,
        }
      },
      UpdateExpression: `SET ${updateExpression.join(',')}`,
      ExpressionAttributeNames: attributeNames,
      ExpressionAttributeValues: attributeValues,
      ReturnValues: 'ALL_NEW',
    });

    const response = await this.dynamoDB.send(command);

    const item = unmarshall(response.Attributes);

    return item as User;
  }

  public async delete(id: ID): Promise<User> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    throw new Error('Method not implemented!');
  }
}

export default UserDynamoDBRepository;
