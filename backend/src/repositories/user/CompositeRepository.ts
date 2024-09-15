import logger from '../../logger';

class UserCompositeRepository implements UserRepository {
  constructor(
    protected dynamoDBRepository: UserRepository,
    protected cacheRepository: UserRepository,
  ) {}

  public async get(id: ID): Promise<User> {
    logger.debug(`${this.constructor.name}.get`, { id });

    let user = await this.cacheRepository.get(id);

    if (typeof user === 'undefined') {
      user = await this.dynamoDBRepository.get(id);

      await this.cacheRepository.create(user);
    }

    return user;
  }

  public async create(params: UserRepository.CreateParameters): Promise<User> {
    logger.debug(`${this.constructor.name}.create`, { params });

    const user = await this.dynamoDBRepository.create(params);

    await this.cacheRepository.create(user);

    return user;
  }

  public async update(params: UserRepository.UpdateParameters, where: { id: ID }): Promise<User> {
    logger.debug(`${this.constructor.name}.update`, { params, where });

    await this.cacheRepository.delete(where.id);

    const user = await this.dynamoDBRepository.update(params, where);

    await this.cacheRepository.create(user);

    return user;
  }

  public async delete(id: ID): Promise<User> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    const user = await this.dynamoDBRepository.delete(id);

    await this.cacheRepository.delete(id);

    return user;
  }
}

export default UserCompositeRepository;
