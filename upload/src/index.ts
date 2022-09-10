import express from 'express';
import config from './config';
import routes from './routes';
import database from './database';
import cors from './middlewares/cors';
import auth from './middlewares/auth';
import trace from './middlewares/trace';
import logger from './logger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(trace);
app.use(cors);
app.use(auth);
app.use((err, req, res, next) => {
  logger.error('Something went wrong!', { error: { message: err.message, stack: err.stack } });
  return res.status(500).json({
    error: {
      message: 'Something went wrong!',
    },
    data: null,
  });
});

if (config.services.storage.type === 'DISK') {
  app.use(express.static((config.services.storage as any).directory));
}

app.use(routes);

async function start(): Promise<void> {
  try {
    // check database connection
    await database.raw('SELECT 1 + 1 AS result');

    if (config.database.runMigrations) {
      await database.migrate.latest();
      const currentVersion = await database.migrate.currentVersion();
      logger.info(`Database migrated to version ${currentVersion}!`);
    }

    app.listen(config.port, () => {
      logger.info(`Server started at http://localhost:${ config.port }`);
    });
  } catch(err) {
    logger.error('Unable to start server!', { error: { message: err.message, stack: err.stack } })
    process.exit(1);
  }
}

start();
