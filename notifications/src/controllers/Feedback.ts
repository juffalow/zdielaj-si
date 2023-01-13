import logger from '../logger';

class FeedbackController {
  constructor(
    protected userRepository: Repositories.UserRepository,
  ) {}

  public async bounce(email: string, meta: unknown): Promise<void> {
    logger.warn('Email bounce feedback received!', { meta });

    const users = await this.userRepository.find({ email });

    if (users.length === 0) {
      return;
    }

    const user = users.shift();

    await this.userRepository.update({
      isDeliverable: false,
      meta,
    }, {
      id: user.id,
    });
  }

  public async complaint(email: string, meta: unknown): Promise<void> {
    logger.warn('Email complaint feedback received!', { meta });

    const users = await this.userRepository.find({ email });

    if (users.length === 0) {
      return;
    }

    const user = users.shift();

    await this.userRepository.update({
      isDeliverable: false,
      meta,
    }, {
      id: user.id,
    });
  }

  public async delivery(email: string, meta: unknown): Promise<void> {
    logger.warn('Email delivery feedback received!', { meta });

    /* not implemented */
  }
}

export default FeedbackController;
