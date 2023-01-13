import express from 'express';
import repositories from '../repositories';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  /*
  if (typeof req['user'] === 'undefined') {
    return res.status(401).json({
      error: 'Unauthorized!',
      data: null,
    });
  }

  if (req['user'].email !== req.query.email && req['user'].role !== 'server') {
    return res.status(401).json({
      error: 'Cannot read data!',
      data: null,
    });
  }

  const emailNotifications = await repositories.UserNotificationSetting.find({ email: String(req.query.email) });

  res.status(200).json({
    error: null,
    data: {
      email: req.query.email,
      notifications: emailNotifications.map(em => ({
        notification: em.notification,
        isEnabled: Boolean(em.isEnabled),
      })),
    },
  }).end();
});

router.post('/', async (req: express.Request, res: express.Response) => {
  if (typeof req['user'] === 'undefined') {
    return res.status(401).json({
      error: 'Unauthorized!',
      data: null,
    });
  }

  if (req['user'].email !== req.body.email && req['user'].role !== 'server') {
    return res.status(401).json({
      error: 'Cannot write data!',
      data: null,
    });
  }

  for (const notification of req.body.notifications) {
    const emailNotifications = await repositories.EmailNotification.find({ email: req.body.email, notification: notification.notification });

    if (emailNotifications.length === 0) {
      await repositories.EmailNotification.create({
        email: req.body.email,
        notification: notification.notification,
        isEnabled: notification.isEnabled,
      });
    } else {
      await repositories.EmailNotification.update({
        email: req.body.email,
        notification: notification.notification,
        isEnabled: notification.isEnabled,
      });
    }
  }

  const emailNotifications = await repositories.EmailNotification.find({ email: String(req.body.email) });

  res.status(200).json({
    error: null,
    data: {
      email: req.body.email,
      notifications: emailNotifications.map(em => ({
        notification: em.notification,
        isEnabled: Boolean(em.isEnabled),
      })),
    },
  }).end();
  */
});

export default router;
