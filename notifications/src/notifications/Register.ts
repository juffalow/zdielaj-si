import Joi from 'joi';
import Notificatons from './Notifications';
import config from '../config';
import logger from '../logger';
import RegisterTemplate from '../templates/email/register';

interface Parameters {
  firstName: string;
  token: string;
  validateEmailLink: string;
}

class RegisterNotifications extends Notificatons {
  public async notify(user: User, parameters: Parameters): Promise<unknown> {
    logger.debug(`${this.constructor.name}.notify`, { user, parameters });

    const isEnabled = await this.canNotifyWithEmail(user, 'register');

    if (isEnabled === false) {
      logger.warn('User unsubscribed from this event or exceeded limit!');
      return;
    }

    return this.sendEmail(
      user.email,
      'Registrácia | Zdielaj.si',
      RegisterTemplate.render({
        email: user.email,
        title: 'Registrácia | Zdielaj.si',
        unsubscribeUrl: this.getUnsubscribeUrl(user.email),
        validateEmailLink: `${config.services.frontend.url}/validacia?id=${user.id}&token=${parameters.token}`,
        ...parameters
      }),
      '"Zdielaj.si" <no-reply@zdielaj.si>',
    );
  }

  public validateParameters(parameters: unknown): void {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      token: Joi.string().required(),
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
