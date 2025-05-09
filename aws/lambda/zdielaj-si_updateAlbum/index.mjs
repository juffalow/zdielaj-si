import { loadConfig } from './config.mjs';
import { getItem, updateItem } from './DynamoDB.mjs';
import logger from './logger.mjs';

export const handler = async (event) => {
  logger.debug('Album ID', event.params.path.id);
  logger.debug('name', event['body-json'].name);
  logger.debug('description', event['body-json'].description);
  logger.debug('Cognito user ID: ', event.context['cognito-user-id']);
  logger.debug('Environment', event['stage-variables'].stage);

  await loadConfig(event['stage-variables'].stage);

  const album = await getItem(event.params.path.id);

  const updatedAlbum = await updateItem({
    id: album.id,
    name: event['body-json'].name,
    description: event['body-json'].description,
    updatedAt: new Date().toISOString(),
  });

  return {
    data: {
      album: updatedAlbum,
    },
  };
};
