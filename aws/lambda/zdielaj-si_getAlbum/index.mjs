'use strict';

import { loadConfig } from './config.mjs';
import { getItem, getItems } from './DynamoDB.mjs';
import { getSignedURL, getURL } from './CloudFront.mjs';
import logger from './logger.mjs';

export const handler = async (event) => {
  logger.debug('Album ID', event.params.path.id);
  logger.debug('Environment', event['stage-variables'].stage);

  await loadConfig(event['stage-variables'].stage);

  const album = await getItem(event.params.path.id);

  if (album === null) {
    throw new Error(`Album ${event.params.path.id} not found!`);
  }

  if (album.files.length > 0 && typeof album.files[0] === 'string') {
    const files = await getItems(album.files);

    album.files = files;
  }

  return {
    data: {
      album: {
        id: album.id,
        name: album.name,
        description: album.description,
        shortLink: album.shortLink,
        media: album.files.map((file) => ({
          id: file.id,
          location: getSignedURL(file.path),
          thumbnails: [
            getURL(`generated/800x800/${file.path}`),
            getURL(`generated/400x400/${file.path}`),
          ],
          mimetype: file.mimetype,
        })),
        createdAt: album.createdAt,
      },
    },
  };
};
