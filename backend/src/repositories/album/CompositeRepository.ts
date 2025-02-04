import logger from '../../logger';

class AlbumCompositeRepository implements AlbumRepository {
  constructor(
    protected dynamoDBRepository: AlbumRepository,
    protected cacheRepository: AlbumRepository,
  ) {}

  public async get(id: ID): Promise<Album> {
    logger.debug(`${this.constructor.name}.get`, { id });

    let album = await this.cacheRepository.get(id);

    if (typeof album === 'undefined') {
      album = await this.dynamoDBRepository.get(id);

      if (typeof album === 'undefined') {
        return undefined;
      }

      await this.cacheRepository.create(album);
    }

    return album;
  }

  public async getMany(ids: ID[]): Promise<Album[]> {
    logger.debug(`${this.constructor.name}.getMany`, { ids });

    const albums = await this.cacheRepository.getMany(ids);

    const missingIds = ids.filter((id) => albums.some((album) => album.id === id) === false);

    if (missingIds.length > 0) {
      const missingAlbums = await this.dynamoDBRepository.getMany(missingIds);

      for (const album of missingAlbums) {
        await this.cacheRepository.create(album);
      }

      return albums.concat(missingAlbums);
    }

    return albums;
  }

  public async create(params: AlbumRepository.CreateParameters): Promise<Album> {
    logger.debug(`${this.constructor.name}.create`, { params });

    const album = await this.dynamoDBRepository.create(params);

    await this.cacheRepository.create(album);

    return album;
  }

  public async update(params: AlbumRepository.UpdateParameters, where: { id: ID }): Promise<Album> {
    logger.debug(`${this.constructor.name}.update`, { params, where });

    await this.cacheRepository.delete(where.id);

    const album = await this.dynamoDBRepository.update(params, where);

    await this.cacheRepository.create(album);

    return album;
  }

  public async delete(id: ID): Promise<Album> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    const album = await this.dynamoDBRepository.delete(id);

    await this.cacheRepository.delete(id);

    return album;
  }
}

export default AlbumCompositeRepository;
