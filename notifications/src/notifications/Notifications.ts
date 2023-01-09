import logger from '../logger';
import { generateToken } from '../utils/functions';

abstract class Notifications {
  public constructor(
    protected unsubscribeUrl: string,
    protected emailNotificationRepository: EmailNotificationRepository,
    protected emailLogRepository: EmailLogRepository,
    protected emailService: Services.Email
  ) {}

  protected async canNotifyWithEmail(email: string, notification: string): Promise<boolean> {
    const emailNotification = await this.emailNotificationRepository.get(email, notification);

    if (typeof emailNotification !== 'undefined' && emailNotification.isEnabled === false) {
      logger.warning('Notification is disabled for this email!', { email, notification });

      return false;
    }

    const isEmailEnabled = await this.emailNotificationRepository.get(email, '');

    if (typeof isEmailEnabled !== 'undefined' && isEmailEnabled.isEnabled === false) {
      logger.warning('Not authorized to notify this email!', { email, notification });

      return false;
    }

    return true;
  }

  protected async hasExceededLimit(email: string): Promise<boolean> {
    // const count = await this.emailLogRepository.count({ email });

    return false;
  }

  protected async sendEmail(email: string, subject: string, body: string, from: string): Promise<unknown> {
    return this.emailService.sendMail(
      email,
      subject,
      body,
      from,
      this.getUnsubscribeUrl(email),
    );
  }

  public getUnsubscribeUrl(email: string): string {
    return `${this.unsubscribeUrl}?email=${email}&token=${generateToken({ email })}`;
  }

  public abstract notify(parameters: unknown): Promise<unknown>;

  public abstract validateParameters(parameters: unknown): void;
}

export default Notifications;
