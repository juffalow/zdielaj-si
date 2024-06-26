import express from 'express';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import config from './config';
import routes from './routes';
import database from './database';
import cors from './middlewares/cors';
import auth from './middlewares/auth';
import responseTime from './middlewares/responseTime';
import trace from './middlewares/trace';
import errorHandler from './middlewares/errorHandler';
import logger from './logger';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
app.use(cookieParser());
app.use(trace);
app.use(responseTime);
app.use(cors);
app.use(auth);

app.use(routes);

app.use(errorHandler);

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
