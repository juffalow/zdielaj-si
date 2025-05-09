'use strict';

import {
    DynamoDB,
    UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import {
    marshall,
    unmarshall,
} from '@aws-sdk/util-dynamodb';
import config from './config.mjs';
import logger from './logger.mjs';

const dynamoDBClient = new DynamoDB({});

export async function addAlbum(id, album) {  
    const command = new UpdateItemCommand({
        TableName: config.DYNAMO_DB_TABLE,
        Key: {
            id: {
                S: 'recent-tests',
            }
        },
        UpdateExpression: 'SET albums = list_append(:newAlbums, albums)',
        ExpressionAttributeValues: {
            ':newAlbums': {
                L: marshall([ album.id ]),
            },
        },
        ReturnValues: 'ALL_NEW',
    });
  
    try {
        const result = await dynamoDBClient.send(command);
        const item = unmarshall(result.Attributes);
    
        return item.recentTests;
    } catch (error) {
        console.error('Error adding new album!', { id, album, error: { message: error.message, stack: error.stack } });
    }
  
    return null;
}
