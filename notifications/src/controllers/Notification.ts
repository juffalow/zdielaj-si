import APIError from '../errors/APIError';
import logger from '../logger';
import getNotification from '../notifications';

class NotificationController {
  constructor(
    protected queue: Services.Queue,
    protected emailNotificationRepository: EmailNotificationRepository,
  ) {}

  public async create(notification: object): Promise<void> {
    await this.validate(notification['name'], notification['parameters']);

    try {  
      await this.queue.sendMessage(notification);
    } catch (error) {
      logger.error('Could not send message to the queue!', error);

      throw new APIError({ message: 'Could not send message to the queue!', code: 503 });
    }
  }

  protected async validate(name: string, parameters: object): Promise<void> {
    try {
      const notification = await getNotification(name);
  
      notification.validateParameters(parameters);
    } catch (error) {
      logger.warn('Notification parameters are not valid!', { error });

      throw new APIError({ message: 'Notification parameters are not valid!', code: 400 });
    }
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
