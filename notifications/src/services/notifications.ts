import EmailNotificationRepository from '../repositories/EmailNotificationRepository';
import KnexEmailNotificationRepository from '../repositories/KnexEmailNotificationRepository';
import EmailLogRepository from '../repositories/EmailLogRepository';
import KnexEmailLogRepository from '../repositories/KnexEmailLogRepository';

class NotificationsService {
  protected emailNotificationRepository: EmailNotificationRepository;
  protected emailLogRepository: EmailLogRepository;

  public constructor(emailNotificationRepository: EmailNotificationRepository, emailLogRepository: EmailLogRepository) {
    this.emailNotificationRepository = emailNotificationRepository;
    this.emailLogRepository = emailLogRepository;
  }

  /**
   * Checks in database if user unsubscribed from specified event.
   * @param email email address
   * @param event event name
   * @returns true if user is subscribed to the event
   */
  public async isMailEventEnabled(email: string, event: string): Promise<boolean> {
    const notification = await this.emailNotificationRepository.get(email, event);

    if (typeof notification !== 'undefined' && notification.isEnabled === false) {
      return false;
    }

    return true;
  }

  public async getMailCount(email: string): Promise<number> {
    const count = await this.emailLogRepository.count({ email });

    return 0;
  }
}

export default new NotificationsService(
  new KnexEmailNotificationRepository(),
  new KnexEmailLogRepository(),
);
