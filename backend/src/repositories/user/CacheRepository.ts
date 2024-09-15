import type { LRUCache } from 'lru-cache';
import logger from '../../logger';

class UserCacheRepository implements UserRepository {
  constructor(
    protected cache: LRUCache<ID, User>,
  ) {}

  public async get(id: ID): Promise<User> {
    logger.debug(`${this.constructor.name}.get`, { id });

    if (this.cache.has(id) === false) {
      return undefined;
    }

    return this.cache.get(id);
  }

  public async create(params: UserRepository.CreateParameters): Promise<User> {
    logger.debug(`${this.constructor.name}.create`, { params });

    this.cache.set(params.id, params);

    return params;
  }

  public async update(params: UserRepository.UpdateParameters, where: { id: ID }): Promise<User> {
    logger.debug(`${this.constructor.name}.update`, { params, where });

    const user = this.cache.get(where.id);

    if (user === undefined) {
      return undefined;
    }

    const updatedUser = {
      ...user,
      ...params,
    };

    this.cache.set(where.id, updatedUser);

    return updatedUser;
  }

  public async delete(id: ID): Promise<User> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    const user = this.cache.get(id);

    this.cache.delete(id);

    return user;
  }
}

export default UserCacheRepository;
