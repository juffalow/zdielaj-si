import express from 'express';
import logger from '../logger';
import {getNotificationSettings, setNotificationSettings} from '../services/notifications';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const response = await getNotificationSettings(String(req.query.email), req.headers.authorization);

    return res.status(200).json(response);
  } catch (error) {
    logger.error('Cannot get email notification settings!', {error});

    return res.status(400).json({
      error: 'Cannot get email notification settings!',
      data: null,
    });
  }
});

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const response = await setNotificationSettings(req.body, req.headers.authorization);

    return res.status(200).json(response);
  } catch (error) {
    logger.error('Cannot set notification settings!', {error});

    return res.status(400).json({
      error: 'Cannot set notifications settings!',
      data: req.body
    });
  }
});

export default router;
