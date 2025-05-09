'use strict';

import { loadConfig } from './config.mjs';
import { getItem, getItems } from './DynamoDB.mjs';
import logger from './logger.mjs';

export const handler = async (event) => {
  logger.debug('ShortLink ID', event.params.path.id);
  logger.debug('Environment', event['stage-variables'].stage);

  await loadConfig(event['stage-variables'].stage);

  const shortLink = await getItem(`shortlink#${event.params.path.id}`);

  return {
    data: {
      shortLink: {
        ...shortLink,
        id: event.params.path.id,
      },
    },
  };
};
