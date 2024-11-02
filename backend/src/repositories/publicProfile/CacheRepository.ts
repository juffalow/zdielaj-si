import type { LRUCache } from 'lru-cache';
import logger from '../../logger';

class PublicProfileCacheRepository implements PublicProfileRepository {
  constructor(
    protected cache: LRUCache<ID, PublicProfile>,
  ) {}

  public async get(id: ID): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.get`, { id });

    if (this.cache.has(id) === false) {
      return undefined;
    }

    return this.cache.get(id);
  }

  public async create(params: PublicProfileRepository.CreateParameters): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.create`, { params });

    this.cache.set(params.id, params);

    return params;
  }

  public async update(params: PublicProfileRepository.UpdateParameters, where: { id: ID }): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.update`, { params, where });

    const publicProfile = this.cache.get(where.id);

    if (publicProfile === undefined) {
      return undefined;
    }

    const updatedPublicProfile = {
      ...publicProfile,
      ...params,
    };

    this.cache.set(where.id, updatedPublicProfile);

    return updatedPublicProfile;
  }

  public async delete(id: ID): Promise<PublicProfile> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    const publicProfile = this.cache.get(id);

    this.cache.delete(id);

    return publicProfile;
  }
}

export default PublicProfileCacheRepository;
