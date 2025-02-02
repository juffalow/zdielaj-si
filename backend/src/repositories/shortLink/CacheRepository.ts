import type { LRUCache } from 'lru-cache';
import logger from '../../logger';

class ShortLinkCacheRepository implements ShortLinkRepository {
  constructor(
    protected cache: LRUCache<string, ShortLink>,
  ) {}

  public async get(path: string): Promise<ShortLink> {
    logger.debug(`${this.constructor.name}.get`, { path });

    if (this.cache.has(path) === false) {
      return undefined;
    }

    return this.cache.get(path);
  }

  public async create(params: { path: string, albumId: ID }): Promise<ShortLink> {
    logger.debug(`${this.constructor.name}.create`, { params });

    this.cache.set(params.path, params);

    return params;
  }

  public async delete(path: string): Promise<ShortLink> {
    logger.debug(`${this.constructor.name}.delete`, { path });

    const link = this.cache.get(path);

    this.cache.delete(path);

    return link;
  }
}

export default ShortLinkCacheRepository;
