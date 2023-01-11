import express from 'express';
import controllers from '../controllers';
import onlyServer from '../middlewares/onlyServer';

const router = express.Router();

router.get('/:id', onlyServer, async (req: express.Request, res: express.Response) => {
  const file = await controllers.Files.getFile(req.params.id);

  res.status(200).json({
    error: null,
    data: {
      file,
    }
  }).end();
});

export default router;
