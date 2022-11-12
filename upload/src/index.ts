import http from 'http';
import { createTerminus } from '@godaddy/terminus';
import app from './app';
import config from './config';
import database from './database';
import logger from './logger';

const server = http.createServer(app);




async function onSignal(): Promise<void> {
  logger.warn('Server is going to shut down! Starting cleanup...');
}

async function onShutdown (): Promise<void> {
  logger.warn('Server is shutting down!');
}

async function onHealthCheck(): Promise<void> {
  return;
}

createTerminus(server, {
  healthChecks: {
    '/health/liveness': onHealthCheck,
  },
  onSignal,
  onShutdown,
});

async function start(): Promise<void> {
  try {
    // check database connection
    await database.raw('SELECT 1 + 1 AS result');

    if (config.database.runMigrations) {
      await database.migrate.latest();
      const currentVersion = await database.migrate.currentVersion();
      logger.info(`Database migrated to version ${currentVersion}!`);
    }

    server.listen(config.port, () => {
      logger.info(`Server started at http://localhost:${ config.port }`);
    });
  } catch(err) {
    logger.error('Unable to start server!', { error: { message: err.message, stack: err.stack } })
    process.exit(1);
  }
}

start();
