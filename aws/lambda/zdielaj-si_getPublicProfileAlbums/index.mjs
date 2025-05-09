'use strict';

import { getItem, getItems } from './DynamoDB.mjs';
import { getSignedURL, getURL } from './CloudFront.mjs';
import logger from './logger.mjs';
import { loadConfig } from './config.mjs';

export const handler = async (event, context) => {
  logger.debug('Public profile ID', event.params.path.id);
  logger.debug('query.first', event.params.querystring.first);
  logger.debug('query.after', event.params.querystring.after);
  logger.debug('Environment', event['stage-variables'].stage);

  const first = 'first' in event.params.querystring ? parseInt(event.params.querystring.first) : 10;
  const after = 'after' in event.params.querystring ? parseInt(event.params.querystring.after) : 0;

  await loadConfig(event['stage-variables'].stage);

  const publicProfile = await getItem(`publicprofile#${event.params.path.id}`);

  if (publicProfile === null) {
    throw new Error(`Public profile ${event.params.path.id} not found!`);
  }

  const albums = await getItems(publicProfile.albums.slice(after, after + Math.min(first, publicProfile.albums.length)));
  const files = await Promise.all(albums.filter(album => album.files.length > 0).map(async (album) => {
    if (typeof album.files[0] === 'string') {
      return getItem(album.files[0]);
    }

    return album.files[0];
  }));

  return {
    data: {
      albums: albums.map((album) => {
        return {
          id: album.id,
          name: album.name,
          description: album.description,
          media: files.filter(file => album.files.includes(file.id) || album.files[0].id === file.id).map((file) => ({
            id: file.id,
            mimetype: file.mimetype,
            location: getSignedURL(file.path),
            thumbnails: [
              getURL(`generated/400x400/${file.path}`),
              getURL(`generated/800x800/${file.path}`),
            ],
            createdAt: file.createdAt,
          })),
          createdAt: album.createdAt,
        };
      }),
    },
  };
};
