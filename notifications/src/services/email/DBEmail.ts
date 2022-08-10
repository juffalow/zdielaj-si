import EmailService from './EmailService';
import logger from '../../logger';
import EmailLogRepository from '../../repositories/EmailLogRepository';

class DBEmail implements EmailService {
  protected emailLogRepository: EmailLogRepository;

  public constructor(emailLogRepository: EmailLogRepository) {
    this.emailLogRepository = emailLogRepository;
  }

  public async sendMail(email: string, subject: string, body: string, from: string): Promise<void> {
    logger.debug(`${this.constructor.name}.sendMail`, { email, subject, body, from });

    await this.emailLogRepository.create({
      email,
      subject,
      body,
      meta: {
        from,
      },
    });
  }
}

export default DBEmail;
