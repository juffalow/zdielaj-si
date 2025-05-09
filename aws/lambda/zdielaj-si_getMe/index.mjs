'use strict';

import { getUser } from './Cognito.mjs';
import { getItem } from './DynamoDB.mjs';
import { loadConfig } from './config.mjs';
import logger from './logger.mjs';

export const handler = async (event) => {
  console.log('I am running!', event);
  logger.debug('AccessToken', event.params.header.accesstoken.substring(0, 16));
  logger.debug('Environment', event['stage-variables'].stage);

  await loadConfig(event['stage-variables'].stage);

  const user = typeof event.params.header.accesstoken === 'string' ? await getUser(event.params.header.accesstoken) : {};

  console.log('User', user);

  const userData = await getItem(user.id);

  return {
    data: {
      user: {
        ...user,
        ...userData,
      },
    },
  };
};
