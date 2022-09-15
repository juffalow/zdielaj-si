import express from 'express';
import config from './config';
import routes from './routes';
import cors from './middlewares/cors';
import auth from './middlewares/auth';
import trace from './middlewares/trace';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(trace);
app.use(cors);
app.use(auth);
app.use(errorHandler);

if (config.services.storage.type === 'DISK') {
  app.use(express.static((config.services.storage as any).directory));
}

app.use(routes);

export default app;
