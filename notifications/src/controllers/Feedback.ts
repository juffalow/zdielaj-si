import logger from '../logger';

class FeedbackController {
  constructor(
    protected emailNotificationRepository: EmailNotificationRepository,
  ) {}

  public async bounce(email: string, meta: unknown): Promise<void> {
    await this.emailNotificationRepository.create({
      email,
      notification: '*',
      isEnabled: false,
      meta,
    });
  }

  public async complaint(email: string, meta: unknown): Promise<void> {
    await this.emailNotificationRepository.create({
      email,
      notification: '*',
      isEnabled: false,
      meta,
    });
  }

  public async delivery(email: string, meta: unknown): Promise<void> {
    /* not implemented */
  }
}

export default FeedbackController;
