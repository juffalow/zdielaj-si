import { loadConfig } from './config.mjs';
import { getItem } from './DynamoDB.mjs';
import logger from './logger.mjs';

export const handler = async (event, context, callback) => {
  logger.debug('Public profile ID', event.params.path.id);
  logger.debug('Environment', event['stage-variables'].stage);

  await loadConfig(event['stage-variables'].stage);

  const publicProfile = await getItem(`publicprofile#${event.params.path.id}`);

  if (publicProfile === null) {
    throw new Error(`Public profile ${event.params.path.id} not found!`);
  }

  return {
    data: {
      publicProfile: {
        ...publicProfile,
        id: event.params.path.id,
      },
    },
  };
};
