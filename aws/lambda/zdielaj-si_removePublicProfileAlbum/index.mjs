import { loadConfig } from './config.mjs';
import { getItem, updateItem } from './DynamoDB.mjs';
import logger from './logger.mjs';

export const handler = async (event) => {
  logger.debug('Public profile ID', event.params.path.id);
  logger.debug('Album ID', event.params.path.albumId);
  logger.debug('Cognito user ID: ', event.context['cognito-user-id']);
  logger.debug('Environment', event['stage-variables'].stage);

  await loadConfig(event['stage-variables'].stage);

  const publicProfile = await getItem(`publicprofile#${event.params.path.id}`);

  await updateItem({
    id: publicProfile.id,
    albums: publicProfile.albums.filter(id => id !== event.params.path.albumId),
    updatedAt: new Date().toISOString(),
  });

  await updateItem({
    id: event.params.path.albumId,
    publicProfile: null,
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
