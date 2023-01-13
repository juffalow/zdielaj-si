import APIError from '../errors/APIError';
import logger from '../logger';
import getNotification from '../notifications';

class NotificationController {
  constructor(
    protected userRepository: Repositories.UserRepository,
    protected queue: Services.Queue,
  ) {}

  public async create(notification: object): Promise<void> {
    await this.validate(notification['name'], notification['parameters']);

    await this.createUser(notification['parameters'].email)

    try {  
      await this.queue.sendMessage(notification);
    } catch (error) {
      logger.error('Could not send message to the queue!', error);

      throw new APIError({ message: 'Could not send message to the queue!', code: 503 });
    }
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
  protected async createUser(email: string): Promise<User> {
    const users = await this.userRepository.find({
      email,
    });

    if (users.length === 1) {
      return users.shift();
    }

    return this.userRepository.create({
      email,
      isDeliverable: true,
    });
  }

  public async send(name: string, parameters: {[x: string]: string}): Promise<void> {
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
  }
}

export default NotificationController;
