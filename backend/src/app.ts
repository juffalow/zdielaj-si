import express from 'express';
import * as Sentry from '@sentry/node';
import config from './config';
import routes from './routes';
import cors from './middlewares/cors';
import auth from './middlewares/auth';
import responseTime from './middlewares/responseTime';
import errorHandler from './middlewares/errorHandler';
import services from './services';

const app = express();

app.disable('x-powered-by');
if (typeof process.env.SENTRY_DSN === 'string') Sentry.setupExpressErrorHandler(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseTime);
app.use(cors);

app.use(services.Trace.openSegment(config.serviceName) as any);
app.use(auth);

app.use(routes);
app.use(services.Trace.closeSegment() as any);

app.use(errorHandler);

export default app;
