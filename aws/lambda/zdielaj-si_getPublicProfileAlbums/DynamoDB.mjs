'use strict';

import {
    DynamoDB,
    GetItemCommand,
    BatchGetItemCommand,
} from '@aws-sdk/client-dynamodb';
import {
    marshall,
    unmarshall,
} from '@aws-sdk/util-dynamodb';
import config from './config.mjs';
import logger from './logger.mjs';

const dynamoDBClient = new DynamoDB({});

export async function getItem(id) {
  const command = new GetItemCommand({
    TableName: config.DYNAMO_DB_TABLE,
    Key: {
      id: {
        S: id,
      },
    },
    ReturnConsumedCapacity: process.env.DEBUG_MODE === 'true' ? 'TOTAL' : 'NONE',
  });

  try {
    const response = await dynamoDBClient.send(command);

    logger.debug('Consumed capacity: ', response.ConsumedCapacity);

    const item = unmarshall(response.Item);

    return item;
  } catch (error) {
    console.error('Error getting item!', { id, error: { message: error.message, stack: error.stack } });
  }

  return null;
}

export async function getItems(ids) {   
    const command = new BatchGetItemCommand({
      RequestItems: {
          [config.DYNAMO_DB_TABLE]: {
            Keys: ids.map((id) => ({
              id: {
                S: id,
              },
            })),
          },
      },
      ReturnConsumedCapacity: process.env.DEBUG_MODE === 'true' ? 'TOTAL' : 'NONE',
    });
  
    try {
      const response = await dynamoDBClient.send(command);
  
      logger.debug('Consumed capacity: ', response.ConsumedCapacity);
  
      const items = response.Responses[config.DYNAMO_DB_TABLE].map(item => unmarshall(item));

      return items.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
    } catch (error) {
      console.error('Error getting items!', { ids, error: { message: error.message, stack: error.stack } });
    }
  
    return null;
  }
  