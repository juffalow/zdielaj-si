import logger from '../../logger';

class CompositeEmail implements Services.Email {

  protected emailServices:Services.Email[];

  public constructor() {
    this.emailServices = [];
  }

  public async sendMail(email: string, subject: string, body: string, from: string): Promise<void> {
    logger.debug(`${this.constructor.name}.sendMail`, { email, subject, body, from });

    await Promise.all(this.emailServices.map((emailService) => {
      return emailService.sendMail(email, subject, body, from);
    }));
  }

  public add(emailService: Services.Email): void {
    this.emailServices.push(emailService);
  }
}

export default CompositeEmail;
