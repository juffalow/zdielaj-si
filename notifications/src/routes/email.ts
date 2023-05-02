import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const settings = await controllers.Settings.getEmailSettings(req.query.email as string, req['user']);

    res.status(200).json({
      error: null,
      data: {
        ...settings,
      },
    }).end();
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const settings = await controllers.Settings.setEmailSettings(req.body.email, req.body.notifications, req['user']);

    res.status(200).json({
      error: null,
      data: {
        ...settings,
      },
    }).end();
  } catch (err) {
    next(err);
  }
});

export default router;
