import logger from '../../logger';

class PublicProfileCompositeRepository implements PublicProfileRepository {
  constructor(
    protected dynamoDBRepository: PublicProfileRepository,
    protected cacheRepository: PublicProfileRepository,
  ) {}

  public async get(id: ID): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.get`, { id });

    let publicProfile = await this.cacheRepository.get(id);

    if (typeof publicProfile === 'undefined') {
      publicProfile = await this.dynamoDBRepository.get(id);

      if (typeof publicProfile !== 'undefined') {
        await this.cacheRepository.create(publicProfile);
      }
    }

    return publicProfile;
  }

  public async create(params: PublicProfileRepository.CreateParameters): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.create`, { params });

    const publicProfile = await this.dynamoDBRepository.create(params);

    await this.cacheRepository.create(publicProfile);

    return publicProfile;
  }

  public async update(params: PublicProfileRepository.UpdateParameters, where: { id: ID }): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.update`, { params, where });

    await this.cacheRepository.delete(where.id);

    const publicProfile = await this.dynamoDBRepository.update(params, where);

    await this.cacheRepository.create(publicProfile);

    return publicProfile;
  }

  public async delete(id: ID): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    const publicProfile = await this.dynamoDBRepository.delete(id);

    await this.cacheRepository.delete(id);

    return publicProfile;
  }
}

export default PublicProfileCompositeRepository;
