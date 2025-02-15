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

class PublicProfileDynamoDBRepository implements PublicProfileRepository {
  constructor(
    protected dynamoDB: DynamoDBClient,
    protected tableName: string,
    protected isDebugModeEnabled: boolean = false,
  ) {}

  public async get(id: ID): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.get`, { id });

    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        id: {
          S: `publicprofile#${id}`,
        },
      },
      ReturnConsumedCapacity: this.isDebugModeEnabled ? 'TOTAL' : 'NONE',
    });
  
    const response = await this.dynamoDB.send(command);

    logger.silly(`${this.constructor.name}.get.response`, response);

    if ('Item' in response === false) {
      return undefined;
    }

    const item = unmarshall(response.Item);

    return {
      ...item,
      id: item.id.replace('publicprofile#', ''),
    } as PublicProfile;
  }

  public async create(params: PublicProfileRepository.CreateParameters): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.create`, { params });

    const { id, ...rest } = params;

    const item = {
      id: `publicprofile#${id}`,
      name: '',
      description: '',
      albums: [],
      typename: 'PublicProfile',
      ...rest,
      createdAt: new Date().toISOString(),
    };
    
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(item, { removeUndefinedValues: true }),
      ConditionExpression: 'attribute_not_exists(id)',
      ReturnConsumedCapacity: this.isDebugModeEnabled ? 'TOTAL' : 'NONE',
    });

    const response = await this.dynamoDB.send(command);

    logger.silly(`${this.constructor.name}.create.result`, response);

    return {
      ...item,
      id,
    } as PublicProfile;
  }

  public async update(params: PublicProfileRepository.UpdateParameters, where: { id: ID }): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.update`, { params, where });

    const updateExpression = [];
    const attributeNames = {};
    const attributeValues = {};

    Object.keys(params).forEach(key => {
      if (['name', 'description', 'albums'].includes(key) === false) return;

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
          S: `publicprofile#${where.id}`,
        }
      },
      UpdateExpression: `SET ${updateExpression.join(',')}`,
      ExpressionAttributeNames: attributeNames,
      ExpressionAttributeValues: attributeValues,
      ReturnValues: 'ALL_NEW',
      ConditionExpression: 'attribute_exists(id)',
      ReturnConsumedCapacity: this.isDebugModeEnabled ? 'TOTAL' : 'NONE',
    });

    const response = await this.dynamoDB.send(command);

    logger.silly(`${this.constructor.name}.update.response`, response);

    const item = unmarshall(response.Attributes);

    return {
      ...item,
      id: item.id.replace('publicprofile#', ''),
    } as PublicProfile;
  }

  public async delete(id: ID): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    throw new Error('Method not implemented!');
  }
}

export default PublicProfileDynamoDBRepository;
