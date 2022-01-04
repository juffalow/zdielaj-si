import nodemailer from 'nodemailer';
import UserNotifications from './UserNotifications';
import register from './templates/register';
import aws from '../../services/aws';
import logger from '../../logger';

export default class MailNotifications implements UserNotifications {
  public async onRegister(user: User, token: string): Promise<void> {
    logger.debug('UserMailNotifications.onRegister', { user });

    const transporter = nodemailer.createTransport({
      SES: aws.ses,
    });

    const info = await transporter.sendMail({
      from: '"Zdielaj.si" <no-reply@zdielaj.si>',
      to: user.email,
      subject: 'Registrácia | Zdielaj.si',
      html: register('Registrácia | Zdielaj.si', user.name, `https://zdielaj.si/validacia?id=${user.id}&token=${token}`),
    });

    logger.debug('UserMailNotifications.onRegister', { info });
  }
  public async onPasswordReset(user: User): Promise<void> {
    logger.debug('UserMailNotifications.onPasswordReset', { user });
  }
}
