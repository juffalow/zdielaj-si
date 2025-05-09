import { loadConfig } from './config.mjs';
import { getItems, updateItem } from './DynamoDB.mjs';
import logger from './logger.mjs';

export const handler = async (event) => {
  logger.debug('Public profile ID', event.params.path.id);
  logger.debug('Album ID', event['body-json'].id);
  logger.debug('Cognito user ID: ', event.context['cognito-user-id']);
  logger.debug('Environment', event['stage-variables'].stage);

  await loadConfig(event['stage-variables'].stage);

  const [ user, publicProfile, album ] = await getItems([
    event.context['cognito-user-id'],
    `publicprofile#${event.params.path.id}`,
    event['body-json'].id
  ]);

  await updateItem({
    id: publicProfile.id,
    albums: Array.from((new Set(publicProfile.albums || [])).add(album.id)).sort((a, b) => user.albums.indexOf(a) - user.albums.indexOf(b)),
    updatedAt: new Date().toISOString(),
  });

  await updateItem({
    id: album.id,
    publicProfile: {
      id: publicProfile.id.replace('publicprofile#', ''),
    },
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
