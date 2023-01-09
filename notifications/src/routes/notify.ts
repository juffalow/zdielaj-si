import express from 'express';
import logger from '../logger';
import getNotification from '../notifications';
import controllers from '../controllers';
import onlyServer from '../middlewares/onlyServer';

const router = express.Router();

const validate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const notification = await getNotification(req.body.name);

    notification.validateParameters(req.body.parameters);
  } catch (error) {
    logger.warn('Notification parameters are not valid!', { error });
    
    return res.status(400).json({
      data: null,
      error: 'Notification parameters are not valid!',
    });
  }

  next();
}

router.post('/', onlyServer, validate, async (req: express.Request, res: express.Response) => { 
  const notificationController = controllers.Notification;

  return notificationController.create(req, res);
});

export default router;
