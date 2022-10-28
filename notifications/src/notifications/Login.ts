import Joi from 'joi';
import Notificatons from './Notifications';
import logger from '../logger';
import LoginTemplate from '../templates/email/login';

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

    this.sendEmail(
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

  public validateParameters(parameters: unknown): void {
    const schema = Joi.object({
      email: Joi.string().required(),
      firstName: Joi.string().required(),
    });

    const { error } = schema.validate(parameters);
  
    if (error) {
      logger.error('Parameters are not valid!', error);

      throw 'Parameters are not valid!';
    }
  }
}

export default LoginNotification;
