import nodemailer from 'nodemailer';
import aws from './aws';
import logger from '../logger';
import EmailLogRepository from '../repositories/KnexEmailLogRepository';

class EmailService {
  protected transporter: nodemailer.Transporter<unknown>;

  protected emailLogRepository: EmailLogRepository;

  public constructor() {
    this.transporter = nodemailer.createTransport({
      SES: aws.ses,
    });

    this.emailLogRepository = new EmailLogRepository();
  }

  public async sendMail(email: string, subject: string, body: string, from: string): Promise<void> {
    const info = await this.transporter.sendMail({
      from,
      to: email,
      subject,
      html: body,
    });

    await this.createEmailLog(email, subject, body, from);

    logger.info('Email sent!', { info });
  }

  protected async createEmailLog(email: string, subject: string, body: string, from: string): Promise<void> {
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

export default new EmailService();
