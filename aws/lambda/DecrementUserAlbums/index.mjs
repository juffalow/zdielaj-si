'use strict';

import { DynamoDB, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const DYNAMO_DB_TABLE_NAME = 'zdielaj-si';
const dynamoDBClient = new DynamoDB({});

async function decrementAlbumCount(userId) {
  const command = new UpdateItemCommand({
    TableName: DYNAMO_DB_TABLE_NAME,
    Key: { id: { S: userId } },
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET #statistics.#count = if_not_exists(#statistics.#count, :zero) - :one',
    ExpressionAttributeNames: { '#statistics': 'statistics', '#count': 'albums' },
    ExpressionAttributeValues: { ':zero': { N: '0' }, ':one': { N: '1' } },
  });

  try {
    await dynamoDBClient.send(command);
  } catch (error) {
    console.error('Error updating user albums count!', { message: error.message, stack: error.stack });
  }
}

export const handler = async (event) => {
  for (const record of event.Records) {
    if (record.eventName === 'REMOVE' && record.dynamodb.OldImage.typename && record.dynamodb.OldImage.typename.S === 'Album') {
      await decrementAlbumCount(record.dynamodb.OldImage.user.M.id.S);
    }
  }
};
