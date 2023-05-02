import logger from '../logger';
import { generateToken } from '../utils/functions';

abstract class Notifications {
  public constructor(
    protected unsubscribeUrl: string,
    protected settingRepository: Repositories.SettingRepository,
    protected emailService: Services.Email
  ) {}

  protected async canNotifyWithEmail(user: User, notification: string): Promise<boolean> {
    if (user.isDeliverable === false) {
      logger.warning('Email address is blocked!', { user });

      return false;
    }

    const settings = await this.settingRepository.find({
      user: {
        id: user.id,
      },
      notification,
      isEnabled: false,
    });

    if (settings.length > 0) {
      logger.warning('Notification is disabled for this email!', { user, notification });

      return false;
    }

    return true;
  }

  protected async hasExceededLimit(email: string): Promise<boolean> {
    // const count = await this.emailLogRepository.count({ email });

    return false;
  }

  protected async sendEmail(email: string, subject: string, body: string, from: string): Promise<void> {
    await this.emailService.sendMail(
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

  public abstract notify(user: User, parameters: unknown): Promise<unknown>;

  public abstract validateParameters(parameters: unknown): void;
}

export default Notifications;
