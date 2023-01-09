import Joi from 'joi';
import Notificatons from './Notifications';
import logger from '../logger';
import RegisterTemplate from '../templates/email/register';

interface Parameters {
  email: string;
  firstName: string;
  validateEmailLink: string;
}

class RegisterNotifications extends Notificatons {
  public async notify(parameters: Parameters): Promise<unknown> {
    logger.debug(`${this.constructor.name}.notify`, { parameters });

    const isEnabled = await this.canNotifyWithEmail(parameters.email, 'register');

    if (isEnabled === false) {
      logger.warn('User unsubscribed from this event or exceeded limit!!');
      return;
    }

    return this.sendEmail(
      parameters.email,
      'Registrácia | Zdielaj.si',
      RegisterTemplate.render({
        title: 'Registrácia | Zdielaj.si',
        unsubscribeUrl: this.getUnsubscribeUrl(parameters.email),
        ...parameters
      }),
      '"Zdielaj.si" <no-reply@zdielaj.si>',
    );
  }

  public validateParameters(parameters: unknown): void {
    const schema = Joi.object({
      email: Joi.string().required(),
      firstName: Joi.string().required(),
      validateEmailLink: Joi.string().required(),
    });
  
    const { error } = schema.validate(parameters);
  
    if (error) {
      logger.error('Parameters are not valid!', error);
      
      throw 'Parameters are not valid!';
    }
  }
}

export default RegisterNotifications;
