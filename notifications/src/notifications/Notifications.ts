import { ValidationResult } from 'joi';

abstract class Notifications {
  public constructor(
    protected unsubscribeUrl: string,
    protected emailNotificationRepository: EmailNotificationRepository,
    protected emailLogRepository: EmailLogRepository
  ) {}

  protected async canNotifyWithEmail(email: string, notification: string): Promise<boolean> {
    const emaiLNotification = await this.emailNotificationRepository.get(email, notification);

    if (typeof emaiLNotification !== 'undefined' && emaiLNotification.isEnabled === false) {
      return false;
    }

    return true;
  }

  protected async hasExceededLimit(email: string): Promise<boolean> {
    // const count = await this.emailLogRepository.count({ email });

    return false;
  }

  public abstract notify(parameters: unknown): Promise<void>;

  public abstract validateParameters(parameters: unknown): ValidationResult<any>;
}

export default Notifications;
