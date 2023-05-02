import APIError from '../errors/APIError';
import logger from '../logger';
import getNotification from '../notifications';

class NotificationController {
  constructor(
    protected userChannelRepository: Repositories.UserChannelRepository,
    protected queue: Services.Queue,
  ) {}

  public async create(notification: object): Promise<void> {
    await this.validate(notification['name'], notification['parameters']);

    if (this.hasUser(notification)) {
      if (this.hasUserEmail(notification)) {
        await this.createUserChannel(notification['user'].id, 'email', notification['user'].email);
      }

      await this.createUserChannel(notification['user'].id, 'inapp', {});
    }

    try {  
      await this.queue.sendMessage(notification);
    } catch (error) {
      logger.error('Could not send message to the queue!', error);

      throw new APIError({ message: 'Could not send message to the queue!', code: 503 });
    }
  }

  protected hasUser(notification: object): boolean {
    return typeof notification['user'] !== 'undefined' && typeof notification['user'].id !== 'undefined';
  }

  protected hasUserEmail(notification: object): boolean {
    return typeof notification['user'].email !== 'undefined';
  }

  /**
   * Verify that notification with this name exists and all required parameters
   * are set.
   * @param name 
   * @param parameters 
   * @throws APIError if parameters are not valid or notification does not exist
   */
  protected async validate(name: string, parameters: object): Promise<void> {
    try {
      const notification = await getNotification(name);
  
      notification.validateParameters(parameters);
    } catch (error) {
      logger.warn('Notification parameters are not valid!', { error });

      throw new APIError({ message: 'Notification parameters are not valid!', code: 400 });
    }
  }

  /**
   * Checks if user with specified email already exists. If not, creates
   * new user.
   * @param email 
   * @returns 
   */
  protected async createUserChannel(userId: number, type: string, meta: unknown): Promise<UserChannel> {
    const userChannels = await this.userChannelRepository.find({
      user: {
        id: userId,
      },
      type,
      meta: meta as any,
    });

    logger.debug('userChannels', userChannels);

    if (userChannels.length === 1) {
      return userChannels.shift();
    }

    return this.userChannelRepository.create({
      userId,
      type,
      meta,
      isEnabled: true,
    });
  }

  public async send(name: string, parameters: {[x: string]: string}): Promise<void> {
    /*
    const users = await this.userRepository.find({ email: parameters['email'] });
    const user = users.shift();

    try {
      const notification = await getNotification(name);
      await notification.notify(user, parameters);
    } catch (err) {
      logger.error('Could not sent notification!', { error: err.message });

      this.userRepository.update({
        isDeliverable: false,
        meta: { error: err.message },
      }, {
        id: user.id,
      });
    }
    */
  }
}

export default NotificationController;
