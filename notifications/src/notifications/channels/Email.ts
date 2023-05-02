import logger from '../../logger';

class Email {
  public constructor(
    protected emailService: Services.Email,
    protected unsubscribeUrl: string,
    protected settingRepository: Repositories.SettingRepository,
  ) {}

  public async send() {
    logger.debug(`${this.constructor.name}.send`, { });

  }

  protected async hasExceededLimit(): Promise<boolean> {
    return false;
  }
}

export default Email;
