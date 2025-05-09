'use strict';

import { unmarshall } from '@aws-sdk/util-dynamodb';
import { setConfig } from './config.mjs';
import { getItem, updateItem } from './dynamodb.mjs';

export const handler = async (event) => {
  for (const record of event.Records) {
    const album = unmarshall(record.dynamodb.OldImage);

    console.log('album', album);
    console.log('album.publicProfile.id', 'publicProfile' in album && 'id' in album.publicProfile ? album.user.id : null);

    if ('publicProfile' in album === null || album.publicProfile === null) {
      return;
    }

    const publicProfile = await getItem(`publicprofile#${album.publicProfile.id}`, { DYNAMO_DB_TABLE: record.eventSourceARN.split('/')[1] });

    await updateItem({
      id: publicProfile.id,
      albums: publicProfile.albums.filter(a => a !== album.id),
      updatedAt: new Date().toISOString(),
    }, { DYNAMO_DB_TABLE: record.eventSourceARN.split('/')[1] });
  }
};
