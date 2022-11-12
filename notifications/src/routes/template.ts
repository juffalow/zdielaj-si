import express from 'express';
import logger from '../logger';

const router = express.Router();

router.get('/email/:name', async (req: express.Request, res: express.Response) => {
  const name = req.params.name;

  const filename = '../templates/email/' + name.toLowerCase() + '.js';
  
  const template = await import(filename)
    .then(module => module.default)
    .catch(() => {
      logger.error(`Template ${name} does not exist!`);
      throw `Template ${name} does not exist!`;
    });

  const body = template.render(req.query);
  
  res.status(200).send(body).end();
});

export default router;
