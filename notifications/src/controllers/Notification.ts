import { Request, Response } from 'express';
import logger from '../logger';
import getNotification from '../notifications';

class NotificationController {
  constructor(
    protected queue: Services.Queue,
    protected emailNotificationRepository: EmailNotificationRepository,
  ) {}

  public async create(req: Request, res: Response): Promise<unknown> {
    try {
      await this.queue.sendMessage(req.body);
    } catch (error) {
      logger.error('Could not send message to the queue!', error);

      return res.status(503).json({
        data: null,
        error: 'Could not send message to the queue!',
      });
    }
  
    res.status(200).json({
      error: null,
      data: null,
    }).end();
  }

  public async send(name: string, parameters: {[x: string]: string}): Promise<void> {
    try {
      const notification = await getNotification(name);
      await notification.notify(parameters);
    } catch (err) {
      logger.error('Could not sent notification!', err);
      
      await this.emailNotificationRepository.create({
        email: parameters.email,
        notification: '*',
        isEnabled: false,
      });
    }
  }
}

export default NotificationController;
