import express from 'express';
import logger from '../logger';
import { getNotifications } from '../services/notifications';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const response = await getNotifications(String(req.query.email), req.headers.authorization);

    return res.status(200).json(response);
  } catch (error) {
    logger.error('Canot get email notifications!', { error });

    return res.status(400).json({
      error: 'Canot get email notifications!',
      data: null,
    });
  }
});

export default router;
