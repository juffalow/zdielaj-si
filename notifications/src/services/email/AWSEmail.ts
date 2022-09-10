import nodemailer from 'nodemailer';
import { SES } from 'aws-sdk';
import logger from '../../logger';

class AWSEmail implements Services.Email {
  protected transporter: nodemailer.Transporter<unknown>;

  protected unsubscribeUrl: string;

  public constructor(ses: SES, unsubscribeUrl: string) {
    this.transporter = nodemailer.createTransport({
      SES: ses,
    });

    this.unsubscribeUrl = unsubscribeUrl;
  }

  public async sendMail(email: string, subject: string, body: string, from: string): Promise<void> {
    logger.debug(`${this.constructor.name}.sendMail`, { email, subject, body, from });
    
    const info = await this.transporter.sendMail({
      from,
      to: email,
      subject,
      html: body,
      list: {
        unsubscribe: {
          url: this.unsubscribeUrl,
          comment: 'Unsubscribe from this notification.',
        },
      }
    });

    logger.info('Email sent!', { info });
  }
}

export default AWSEmail;
