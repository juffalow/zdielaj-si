import { loadConfig } from './config.mjs';
import { getItem, updateItem } from './DynamoDB.mjs';
import logger from './logger.mjs';

export const handler = async (event) => {
  logger.debug('Public profile ID', event.params.path.id);
  logger.debug('name', event['body-json'].name);
  logger.debug('description', event['body-json'].description);
  logger.debug('Cognito user ID: ', event.context['cognito-user-id']);
  logger.debug('Environment', event['stage-variables'].stage);

  await loadConfig(event['stage-variables'].stage);

  const user = await getItem(event.context['cognito-user-id']);

  if (user.publicProfileId !== event.params.path.id) {
    return {
      statusCode: 403,
      body: {
        message: 'Forbidden',
      },
    };
  }

  const publicProfile = await updateItem({
    id: `publicprofile#${event.params.path.id}`,
    name: event['body-json'].name,
    description: event['body-json'].description,
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
