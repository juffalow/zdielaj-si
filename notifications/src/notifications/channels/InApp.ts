import logger from '../../logger';

class InApp {
  public constructor(
    protected notificationRepository: Repositories.NotificationRepository,
    protected emailService: Services.Email,
    protected unsubscribeUrl: string,
    protected settingRepository: Repositories.SettingRepository,
  ) {}

  public async send(user: User, channel: UserChannel, notification: any): Promise<unknown> {
    logger.debug(`${this.constructor.name}.send`, { });

    await this.notificationRepository.create({
      userId: user.id,
      
    });
  }

  protected async hasExceededLimit(): Promise<boolean> {
    return false;
  }
}

export default InApp;
