'use strict';

import { DynamoDB, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const DYNAMO_DB_TABLE_NAME = 'zdielaj-si';
const dynamoDBClient = new DynamoDB({});

async function incrementFileCountAndTotalSize(userId, size) {
  const command = new UpdateItemCommand({
    TableName: DYNAMO_DB_TABLE_NAME,
    Key: { id: { S: userId } },
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET #statistics.#count = if_not_exists(#statistics.#count, :zero) + :one, #statistics.#size = if_not_exists(#statistics.#size, :zero) + :size',
    ExpressionAttributeNames: { '#statistics': 'statistics', '#count': 'files', '#size': 'totalSize' },
    ExpressionAttributeValues: { ':zero': { N: '0' }, ':one': { N: '1' }, ':size': { N: size } },
  });

  try {
    await dynamoDBClient.send(command);
  } catch (error) {
    console.error('Error updating user files count!', { message: error.message, stack: error.stack });
  }
}

export const handler = async (event) => {
  for (const record of event.Records) {
    if (record.eventName === 'INSERT' && record.dynamodb.NewImage.typename.S === 'File') {
      await incrementFileCountAndTotalSize(record.dynamodb.NewImage.user.M.id.S, record.dynamodb.NewImage.size.N);
    }
  }
};
