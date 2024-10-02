import express from 'express';
import * as Sentry from '@sentry/node';
import routes from './routes';
import cors from './middlewares/cors';
import auth from './middlewares/auth';
import responseTime from './middlewares/responseTime';
import trace from './middlewares/trace';
import errorHandler from './middlewares/errorHandler';

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

export default app;
