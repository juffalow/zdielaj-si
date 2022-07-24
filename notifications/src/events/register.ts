import logger from '../logger';
import emailService from '../services/email';
import notificationsService from '../services/notifications';
import registerTemplate from '../templates/email/register';

async function register(user: User): Promise<void> {
  logger.debug('Event.register', user);

  const isEnabled = await notificationsService.isMailEventEnabled(user.email, 'register');
  const count = await notificationsService.getMailCount(user.email);

  if (isEnabled === false || count > 1) {
    logger.warn('User unsubscribed from this event or exceeded limit!', { isEnabled, count });
    return;
  }

  await emailService.sendMail(
    user.email,
    'Registrácia | Zdielaj.si',
    registerTemplate(
      'Registrácia | Zdielaj.si',
      user.firstName,
      `https://zdielaj.si/validacia?id=${user.id}&token=${user.token}`
    ),
    '"Zdielaj.si" <no-reply@zdielaj.si>',
  );
}

export default register;
