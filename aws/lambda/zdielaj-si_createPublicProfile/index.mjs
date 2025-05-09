import { loadConfig } from './config.mjs';
import { getItem, createItem, createItems, updateItem } from './DynamoDB.mjs';
import logger from './logger.mjs';

export const handler = async (event) => {
  logger.debug('id', event['body-json'].id);
  logger.debug('name', event['body-json'].name);
  logger.debug('description', event['body-json'].description);
  logger.debug('Cognito user ID: ', event.context['cognito-user-id']);
  logger.debug('Environment', event['stage-variables'].stage);

  await loadConfig(event['stage-variables'].stage);

  const user = await getItem(event.context['cognito-user-id']);

  if ('publicProfileId' in user && user.publicProfileId !== null) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        data: null,
        error: {
          message: 'User already has a public profile!',
        },
      }),
    };
  }

  const publicProfile = await createItem({
    id: `publicprofile#${event['body-json'].id}`,
    name: event['body-json'].name,
    description: event['body-json'].description,
    user: {
      id: event.context['cognito-user-id'],
    },
    albums: [],
    typename: 'PublicProfile',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  await updateItem({
    id: user.id,
    publicProfileId: publicProfile.id.replace('publicprofile#', ''),
    updatedAt: new Date().toISOString(),
  });

  return {
    data: {
      publicProfile: {
        ...publicProfile,
        id: publicProfile.id.replace('publicprofile#', ''),
      },
    },
  };
};
