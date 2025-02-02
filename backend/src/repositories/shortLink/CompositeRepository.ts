import logger from '../../logger';

class ShortLinkCompositeRepository implements ShortLinkRepository {
  constructor(
    protected dynamoDBRepository: ShortLinkRepository,
    protected cacheRepository: ShortLinkRepository,
  ) {}

  public async get(path: string): Promise<ShortLink> {
    logger.debug(`${this.constructor.name}.get`, { path });

    let link = await this.cacheRepository.get(path);

    if (typeof link === 'undefined') {
      link = await this.dynamoDBRepository.get(path);

      if (typeof link !== 'undefined') {
        await this.cacheRepository.create(link);
      }
    }

    return link;
  }

  public async create(params: { path: string, albumId: string }): Promise<ShortLink> {
    logger.debug(`${this.constructor.name}.create`, { params });

    const link = await this.dynamoDBRepository.create(params);

    await this.cacheRepository.create(link);

    return link;
  }

  public async delete(path: string): Promise<ShortLink> {
    logger.debug(`${this.constructor.name}.delete`, { path });

    const link = await this.dynamoDBRepository.delete(path);

    await this.cacheRepository.delete(path);

    return link;
  }
}

export default ShortLinkCompositeRepository;
