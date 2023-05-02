import logger from '../logger';

class FeedbackController {
  constructor(
    protected userChannelRepository: Repositories.UserChannelRepository,
  ) {}

  public async bounce(email: string, meta: unknown): Promise<void> {
    logger.warn('Email bounce feedback received!', { meta });

    const userChannels = await this.userChannelRepository.find({
      meta: {
        email,
      },
    });

    if (userChannels.length === 0) {
      return;
    }

    const userChannel = userChannels.shift();

    await this.userChannelRepository.update({
      isEnabled: false,
    }, {
      id: userChannel.id,
    });
  }

  public async complaint(email: string, meta: unknown): Promise<void> {
    logger.warn('Email complaint feedback received!', { meta });

    const userChannels = await this.userChannelRepository.find({
      meta: {
        email,
      },
    });

    if (userChannels.length === 0) {
      return;
    }

    const userChannel = userChannels.shift();

    await this.userChannelRepository.update({
      isEnabled: false,
    }, {
      id: userChannel.id,
    });
  }

  public async delivery(email: string, meta: unknown): Promise<void> {
    logger.warn('Email delivery feedback received!', { meta });

    /* not implemented */
  }
}

export default FeedbackController;
