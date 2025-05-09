import { loadConfig } from './config.mjs';
import { getItems, updateItem, deleteItem } from './DynamoDB.mjs';
import logger from './logger.mjs';

export const handler = async (event) => {
  logger.debug('Album ID', event.params.path.id);
  logger.debug('Cognito user ID: ', event.context['cognito-user-id']);
  logger.debug('Environment', event['stage-variables'].stage);

  await loadConfig(event['stage-variables'].stage);

  const [ user, album ] = await getItems([ event.context['cognito-user-id'], event.params.path.id ]);

  await updateItem({
    id: user.id,
    albums: user.albums.filter(id => id !== event.params.path.id),
    updatedAt: new Date().toISOString(),
  });

  await deleteItem(event.params.path.id);

  return {
    data: {
      album,
    },
  };
};
