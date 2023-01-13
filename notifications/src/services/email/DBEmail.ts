import logger from '../../logger';

class DBEmail implements Services.Email {
  public constructor(
    protected userRepository: Repositories.UserRepository,
    protected notificationRepository: Repositories.NotificationRepository,
  ) {}

  public async sendMail(email: string, subject: string, body: string, from: string): Promise<void> {
    logger.debug(`${this.constructor.name}.sendMail`, { email, subject, body, from });

    const users = await this.userRepository.find({ email });
    const user = users.shift();

    await this.notificationRepository.create({
      userId: user.id,
      type: 'email',
      subject,
      body,
      meta: {
        from,
      },
      status: 'sent',
    });
  }
}

export default DBEmail;
