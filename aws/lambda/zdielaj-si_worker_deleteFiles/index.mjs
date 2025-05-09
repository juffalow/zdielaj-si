'use strict';

import { unmarshall } from '@aws-sdk/util-dynamodb';
import { deleteObject } from './storage.mjs';

export const handler = async (event) => {
  for (const record of event.Records) {
    const album = unmarshall(record.dynamodb.OldImage);

    console.log('album', album);
    console.log('album.files', album.files.map(file => file.path));

    for (const file of album.files) {
      await deleteObject(file.path, { S3_BUCKET: record.eventSourceARN.split('/')[1] === 'zdielaj-si' ? 'zdielaj-si-media' : 'zdielaj-si-media-dev' } );
      await deleteObject(`generated/400x400/${file.path}`, { S3_BUCKET: record.eventSourceARN.split('/')[1] === 'zdielaj-si' ? 'zdielaj-si-media' : 'zdielaj-si-media-dev' } );
      await deleteObject(`generated/800x800/${file.path}`, { S3_BUCKET: record.eventSourceARN.split('/')[1] === 'zdielaj-si' ? 'zdielaj-si-media' : 'zdielaj-si-media-dev' } );
    }
  }
};
