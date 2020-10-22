import express from 'express';
import config from './config';
import routes from './routes';
import cors from './middlewares/cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);

app.use(routes);

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${ config.port }`);
});
