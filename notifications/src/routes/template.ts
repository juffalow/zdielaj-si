import express from 'express';
import templates from '../templates/email';

const router = express.Router();

router.get('/email/:name', async (req: express.Request, res: express.Response) => {
  const name = req.params.name;
  const template = templates(name);

  const body = template.render(req.query);
  
  res.status(200).send(body).end();
});

export default router;
