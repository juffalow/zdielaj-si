import {
  DynamoDBClient,
  BatchGetItemCommand,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  AttributeValue,
} from '@aws-sdk/client-dynamodb';
import {
  marshall,
  unmarshall,
} from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import logger from '../../logger';

class AlbumDynamoDBRepository implements AlbumRepository {
  constructor(
    protected dynamoDB: DynamoDBClient,
    protected tableName: string,
    protected isDebugModeEnabled: boolean = false,
  ) {}

  public async get(id: ID): Promise<Album> {
    logger.debug(`${this.constructor.name}.get`, { id });

    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        id: {
          S: id as string,
        },
      },
      ReturnConsumedCapacity: this.isDebugModeEnabled ? 'TOTAL' : 'NONE',
    });
  
    const response = await this.dynamoDB.send(command);

    logger.silly(`${this.constructor.name}.getMany.response`, response);
    logger.debug(`${this.constructor.name}.getMany.consumedCapacity`, response.ConsumedCapacity);

    if ('Item' in response === false) {
      return undefined;
    }

    const item = unmarshall(response.Item);

    return item as Album;
  }

  public async getMany(ids: ID[]): Promise<Album[]> {
    logger.debug(`${this.constructor.name}.getMany`, { ids });

    const command = new BatchGetItemCommand({
      RequestItems: {
        [this.tableName]: {
          Keys: ids.map(id => ({
            id: {
              S: id as string,
            }
          })),
        },
      },
      ReturnConsumedCapacity: this.isDebugModeEnabled ? 'TOTAL' : 'NONE',
    });

    const response = await this.dynamoDB.send(command);

    logger.silly(`${this.constructor.name}.getMany.response`, response);
    logger.debug(`${this.constructor.name}.getMany.consumedCapacity`, response.ConsumedCapacity);

    const items = response.Responses[this.tableName].map(album => unmarshall(album));

    return items as Album[];
  }

  public async create(params: AlbumRepository.CreateParameters): Promise<Album> {
    logger.debug(`${this.constructor.name}.create`, { params });

    const id = uuidv4();
    const compressedId = Buffer.from(id.replace(/-/g, ''), 'hex').toString('base64url');

    const item = {
      id,
      compressedId,
      files: [],
      user: null,
      ...params,
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
    logger.debug(`${this.constructor.name}.getMany.consumedCapacity`, response.ConsumedCapacity);

    return item as Album;
  }

  public async update(params: AlbumRepository.UpdateParameters, where: { id: ID }): Promise<Album> {
    logger.debug(`${this.constructor.name}.update`, { params, where });

    const updateExpression = [];
    const attributeNames = {};
    const attributeValues = {};

    Object.keys(params).forEach(key => {
      if (['files', 'name', 'description', 'shortLink'].includes(key) === false) return;

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
      ConditionExpression: 'attribute_exists(id)',
      ReturnConsumedCapacity: this.isDebugModeEnabled ? 'TOTAL' : 'NONE',
    });

    const response = await this.dynamoDB.send(command);

    logger.silly(`${this.constructor.name}.update.response`, response);
    logger.debug(`${this.constructor.name}.getMany.consumedCapacity`, response.ConsumedCapacity);

    const item = unmarshall(response.Attributes);

    return item as Album;
  }

  public async delete(id: ID): Promise<Album> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: {
        id: {
          S: id as ID,
        }
      },
      ReturnValues: "ALL_OLD",
    });
  
    const response = await this.dynamoDB.send(command);

    logger.silly(`${this.constructor.name}.update.response`, response);
    logger.debug(`${this.constructor.name}.getMany.consumedCapacity`, response.ConsumedCapacity);

    if ('Item' in response === false) {
      return undefined;
    }

    const item = unmarshall(response.Item as Record<string, AttributeValue>);

    return item as Album;
  }
}

export default AlbumDynamoDBRepository;
