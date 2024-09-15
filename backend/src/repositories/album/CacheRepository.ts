import type { LRUCache } from 'lru-cache';
import logger from '../../logger';

class AlbumCacheRepository implements AlbumRepository {
  constructor(
    protected cache: LRUCache<ID, Album>,
  ) {}

  public async get(id: ID): Promise<Album> {
    logger.debug(`${this.constructor.name}.get`, { id });

    if (this.cache.has(id) === false) {
      return undefined;
    }

    return this.cache.get(id);
  }

  public async create(params: AlbumRepository.CreateParameters): Promise<Album> {
    logger.debug(`${this.constructor.name}.create`, { params });

    this.cache.set(params.id, params as Album);

    return params as Album;
  }

  public async update(params: AlbumRepository.UpdateParameters, where: { id: ID }): Promise<Album> {
    logger.debug(`${this.constructor.name}.update`, { params, where });

    const album = this.cache.get(where.id);

    if (album === undefined) {
      return undefined;
    }

    const updatedAlbum = {
      ...album,
      ...params,
    };

    this.cache.set(where.id, updatedAlbum);

    return updatedAlbum;
  }

  public async delete(id: ID): Promise<Album> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    const album = this.cache.get(id);

    this.cache.delete(id);

    return album;
  }
}

export default AlbumCacheRepository;
