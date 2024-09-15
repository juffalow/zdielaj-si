import express from 'express';
import * as Sentry from '@sentry/node';
import config from './config';
import routes from './routes';
import cors from './middlewares/cors';
import auth from './middlewares/auth';
import responseTime from './middlewares/responseTime';
import trace from './middlewares/trace';
import errorHandler from './middlewares/errorHandler';
import logger from './logger';

const app = express();

app.disable('x-powered-by');
if (typeof process.env.SENTRY_DSN === 'string') Sentry.setupExpressErrorHandler(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(trace);
app.use(responseTime);
app.use(cors);
app.use(auth);

app.use(routes);

app.use(errorHandler);

async function start(): Promise<void> {
  try {
    app.listen(config.port, () => {
      logger.info(`Server started at http://localhost:${ config.port }`);
    });
  } catch(err) {
    logger.error('Unable to start server!', { error: { message: err.message, stack: err.stack } })
    process.exit(1);
  }
}

start();
