import nodemailer from 'nodemailer';
import aws from '../aws';
import logger from '../../logger';

class AWSEmail {
  protected transporter: nodemailer.Transporter<unknown>;

  public constructor() {
    this.transporter = nodemailer.createTransport({
      SES: aws.ses,
    });
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
          url: 'https://zdielaj.si/notifikacie',
          comment: 'Unsubscribe from this notification.',
        },
      }
    });

    logger.info('Email sent!', { info });
  }
}

export default AWSEmail;
