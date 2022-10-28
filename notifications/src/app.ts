import express from 'express';
import routes from './routes';
import cors from './middlewares/cors';
import auth from './middlewares/auth';
import trace from './middlewares/trace';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(trace);
app.use(cors);
app.use(auth);
app.use(errorHandler);

app.use(routes);

export default app;