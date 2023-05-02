import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const user = {
      ...req['user'],
      email: req.query.email,
    };
    const settings = await controllers.Settings.getSettings(user, req.query.type as string);

    res.status(200).json({
      error: null,
      data: {
        settings,
      },
    }).end();
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const user = {
      ...req['user'],
      email: req.query.email,
    };
    const settings = await controllers.Settings.setSettings(user, req.body.type, req.body.notifications);

    res.status(200).json({
      error: null,
      data: {
        settings,
      },
    }).end();
  } catch (err) {
    next(err);
  }
});

export default router;
