import express from 'express';
import controllers from '../controllers';
import onlyServer from '../middlewares/onlyServer';

const router = express.Router();

router.post('/', onlyServer, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await controllers.Notification.create(req.body);

    res.status(200).json({
      error: null,
      data: null,
    }).end();
  } catch (err) {
    next(err);
  }
});

export default router;
