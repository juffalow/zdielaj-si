'use strict';

import { unmarshall } from '@aws-sdk/util-dynamodb';
import { setConfig } from './config.mjs';
import { getItem, updateItem, createItem } from './DynamoDB.mjs';

export const handler = async (event) => {
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      const album = unmarshall(record.dynamodb.NewImage);
      const totalSize = album.files.reduce((total, file) => total + file.size, 0);
      
      console.log('album', album);
      console.log('album.user.id', album.user.id);
      console.log('totalSize', totalSize);

      const user = await getItem(album.user.id, { DYNAMO_DB_TABLE: record.eventSourceARN.split('/')[1] });

      if (user === null) {
        await createItem({
          id: album.user.id,
          albums: [ album.id ],
          statistics: {
            albums: 1,
            files: album.files.length,
            size: totalSize,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }, { DYNAMO_DB_TABLE: record.eventSourceARN.split('/')[1] });

        continue;
      }

      await updateItem({
        id: user.id,
        albums: 'albums' in user && Array.isArray(user.albums) ? [ album.id, ...user.albums ] : [ album.id ],
        statistics: {
          albums: ('statistics' in user && typeof user.statistics.albums === 'number' ? user.statistics.albums : 0) + 1,
          files: ('statistics' in user && typeof user.statistics.files === 'number' ? user.statistics.files : 0) + album.files.length,
          totalSize: ('statistics' in user && typeof user.statistics.totalSize === 'number' ? user.statistics.totalSize : 0) + totalSize,
        },
        updatedAt: new Date().toISOString(),
      }, { DYNAMO_DB_TABLE: record.eventSourceARN.split('/')[1] });
    } else if (record.eventName === 'REMOVE') {
      const album = unmarshall(record.dynamodb.OldImage);
      const totalSize = (Array.isArray(album.files) === false || album.files.length === 0 || typeof album.files[0] === 'string') ? 0 : album.files.reduce((total, file) => total + file.size, 0);

      console.log('album', album);
      console.log('album.user.id', album.user.id);
      console.log('totalSize', totalSize);

      const user = await getItem(album.user.id, { DYNAMO_DB_TABLE: record.eventSourceARN.split('/')[1] });

      await updateItem({
        id: user.id,
        albums: user.albums.filter(a => a !== album.id),
        statistics: {
          albums: ('statistics' in user && typeof user.statistics.albums === 'number' ? user.statistics.albums : 0) - 1,
          files: ('statistics' in user && typeof user.statistics.files === 'number' ? user.statistics.files : 0) - album.files.length,
          totalSize: ('statistics' in user && typeof user.statistics.totalSize === 'number' ? user.statistics.totalSize : 0) - totalSize,
        },
        updatedAt: new Date().toISOString(),
      }, { DYNAMO_DB_TABLE: record.eventSourceARN.split('/')[1] });
    }
  }
};
