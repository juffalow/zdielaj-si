import Joi from 'joi';
import Notificatons from './Notifications';
import logger from '../logger';
import RegisterTemplate from '../templates/email/register';
import emailService from '../services/email';

interface Parameters {
  email: string;
  firstName: string;
  validateEmailLink: string;
  title: string;
  unsubscribeUrl: string;
}

class RegisterNotifications extends Notificatons {
  public async notify(parameters: Parameters): Promise<void> {
    logger.debug(`${this.constructor.name}.notify`, { parameters });

    const isEnabled = await this.canNotifyWithEmail(parameters.email, 'register');

    if (isEnabled === false) {
      logger.warn('User unsubscribed from this event or exceeded limit!!');
      return;
    }

    await emailService.sendMail(
      parameters.email,
      'Registrácia | Zdielaj.si',
      RegisterTemplate.render(parameters),
      '"Zdielaj.si" <no-reply@zdielaj.si>',
    );
  }

  public validateParameters(parameters: unknown): Joi.ValidationResult<any> {
    const schema = Joi.object({
      email: Joi.string().required(),
      firstName: Joi.string().required(),
      validateEmailLink: Joi.string().required(),
      unsubscribeUrl: Joi.string().required(),
    });
  
    return schema.validate(parameters);
  }
}

export default RegisterNotifications;
