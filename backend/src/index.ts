import express from 'express';
import config from './config';
import routes from './routes';
import database from './database';
import cors from './middlewares/cors';
import auth from './middlewares/auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(auth);
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    error: {
      message: 'Something went wrong!',
    },
    data: null,
  });
});

app.use(routes);

async function start(): Promise<void> {
  try {
    // check database connection
    await database.raw('SELECT 1 + 1 AS result');

    if (config.database.runMigrations) {
      await database.migrate.latest();
      const currentVersion = await database.migrate.currentVersion();
      console.log(`Database migrated to version ${currentVersion}!`);
    }

    app.listen(config.port, () => {
      console.log(`Server started at http://localhost:${ config.port }`);
    });
  } catch(error) {
    console.error({ message: 'Unable to start server!', error });
    console.log(error);
    process.exit(1);
  }
}

start();
