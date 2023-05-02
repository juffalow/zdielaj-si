import Joi from 'joi';
import Notificatons from './Notifications';
import logger from '../logger';
import LoginTemplate from '../templates/email/login';

interface Parameters {
  email: string;
  firstName: string;
}

class LoginNotification extends Notificatons {
  public async notify(user: User, parameters: Parameters): Promise<unknown> {
    logger.debug(`${this.constructor.name}.notify`, { parameters });

    const isEnabled = await this.canNotifyWithEmail(user, 'login');

    if (isEnabled === false) {
      logger.warn('User unsubscribed from this event or exceeded limit!!');
      return;
    }

    return this.sendEmail(
      parameters.email,
      'Nové prihlásenie | Zdielaj.si',
      LoginTemplate.render({
        title: 'Nové prihlásenie | Zdielaj.si',
        unsubscribeUrl: this.getUnsubscribeUrl(parameters.email),
        ...parameters,
      }),
      '"Zdielaj.si" <no-reply@zdielaj.si>',
    );
  }

  public validateParameters(parameters: unknown): void {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      city: Joi.string().optional(),
      country: Joi.string().optional(),
      os: Joi.string().optional(),
      browser: Joi.string().optional(),
      version: Joi.string().optional(),
    });

    const { error } = schema.validate(parameters);
  
    if (error) {
      logger.error('Parameters are not valid!', error);

      throw new Error('Parameters are not valid!');
    }
  }
}

export default LoginNotification;
