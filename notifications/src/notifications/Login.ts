import Joi from 'joi';
import Notificatons from './Notifications';
import logger from '../logger';
import LoginTemplate from '../templates/email/login';
import emailService from '../services/email';

interface Parameters {
  email: string;
  firstName: string;
}

class LoginNotification extends Notificatons {
  public async notify(parameters: Parameters): Promise<void> {
    logger.debug(`${this.constructor.name}.notify`, { parameters });

    const isEnabled = await this.canNotifyWithEmail(parameters.email, 'login');

    if (isEnabled === false) {
      logger.warn('User unsubscribed from this event or exceeded limit!!');
      return;
    }

    await emailService.sendMail(
      parameters.email,
      'Nové prihlásenie | Zdielaj.si',
      LoginTemplate.render({
        title: 'Nové prihlásenie | Zdielaj.si',
        unsubscribeUrl: this.unsubscribeUrl,
        ...parameters,
      }),
      '"Zdielaj.si" <no-reply@zdielaj.si>',
    );
  }

  public validateParameters(parameters: unknown): Joi.ValidationResult<any> {
    const schema = Joi.object({
      email: Joi.string().required(),
      firstName: Joi.string().required(),
    });
  
    return schema.validate(parameters);
  }
}

export default LoginNotification;
