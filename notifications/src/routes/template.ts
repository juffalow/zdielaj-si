import express from 'express';
import registerTemplate from '../templates/email/register';

const router = express.Router();

router.get('/:name', async (req: express.Request, res: express.Response) => {
  const name = req.params.name;
  let body = null;

  switch (name) {
    case 'register':
      body = registerTemplate('Registracia', 'Meno', 'https://zdielaj.si');
      break;
  }

  res.status(200).send(body).end();
});

export default router;
