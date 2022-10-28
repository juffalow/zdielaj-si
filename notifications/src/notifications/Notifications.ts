abstract class Notifications {
  public constructor(
    protected unsubscribeUrl: string,
    protected emailNotificationRepository: EmailNotificationRepository,
    protected emailLogRepository: EmailLogRepository,
    protected emailService: Services.Email
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

  protected async sendEmail(email: string, subject: string, body: string, from: string): Promise<void> {
    await this.emailService.sendMail(
      email,
      subject,
      body,
      from
    );
  }

  public abstract notify(parameters: unknown): Promise<void>;

  public abstract validateParameters(parameters: unknown): void;
}

export default Notifications;
