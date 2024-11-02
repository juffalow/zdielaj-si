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
  ) {}

  public async get(id: ID): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.get`, { id });

    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        id: {
          S: `publicprofile#${id}`,
        }
      }
    });
  
    const result = await this.dynamoDB.send(command);

    const item = unmarshall(result.Item);

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
      ...rest,
      createdAt: new Date().toISOString(),
    };
    
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(item, { removeUndefinedValues: true }),
      ConditionExpression: 'attribute_not_exists(id)',
    });

    const result = await this.dynamoDB.send(command);

    logger.debug('result', result);

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
      if (['name', 'description'].includes(key) === false) return;

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
    });

    const response = await this.dynamoDB.send(command);

    const item = unmarshall(response.Attributes);

    return item as PublicProfile;
  }

  public async delete(id: ID): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    throw new Error('Method not implemented!');
  }
}

export default PublicProfileDynamoDBRepository;
