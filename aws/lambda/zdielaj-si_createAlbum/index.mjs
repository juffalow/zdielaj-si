import { randomUUID, createHash, randomBytes } from 'crypto';
import path from 'path';
import { loadConfig } from './config.mjs';
import { getItem, createItem, createItems, updateItem } from './DynamoDB.mjs';
import { addAlbum } from './User.mjs';
import { getPresignedUrl } from './Storage.mjs';
import logger from './logger.mjs';

export const handler = async (event) => {
  logger.debug('files', event['body-json'].files);
  logger.debug('Cognito user ID: ', event.context['cognito-user-id']);
  logger.debug('Environment', event['stage-variables'].stage);

  const userId = typeof event.context['cognito-user-id'] === 'undefined' ? null : event.context['cognito-user-id'];
  const albumId = randomUUID();

  await loadConfig(event['stage-variables'].stage);

  const files = event['body-json'].files.map((file) => {
    const hash = randomBytes(10).toString('hex');
    const extname = path.extname(file.name);

    return {
      id: randomUUID(),
      path: `${albumId}/${hash}${extname}`,
      mimetype: file.mimetype,
      size: file.size,
    };
  });

  const album = await createItem({
    id: albumId,
    typename: 'Album',
    files,
    user: {
      id: userId,
    },
    shortLink: {
      path: (Math.random() * 0.001).toString(36).slice(-6),
    },
    createdAt: new Date().toISOString(),
  });

  const shortLink = await createItem({
    id: `shortlink#${album.shortLink.path}`,
    typename: 'ShortLink',
    album: {
      id: album.id,
    },
    createdAt: new Date().toISOString(),
  });

  return {
    data: {
      album: {
        ...album,
        files: await Promise.all(files.map(async (file) => ({ ...file, uploadUrl: await getPresignedUrl({ Key: file.path }, { type: 'original', creator: 'lambda', function: 'createFile' }) }))),
      },
    },
  };
};
