import express from 'express';
import controllers from '../controllers';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const response = await controllers.Notifications.getSettings(String(req.query.email),  req.headers.authorization);

    res.status(200).json(response);

    next();
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const response = await controllers.Notifications.updateSettings(req.body, req.headers.authorization);

    res.status(200).json(response);

    next();
  } catch (err) {
    next(err);
  }
});

export default router;
