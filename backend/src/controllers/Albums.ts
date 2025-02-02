import { NotFoundError, ForbiddenError } from '../errors/APIError';
import logger from '../logger';

class Albums implements AlbumsController {
  constructor(
    protected albumRepository: AlbumRepository,
    protected userRepository: UserRepository,
    protected uploadService: Services.Upload,
  ) {}

  /**
   * Retrieves single album with specified ID.
   * @param id 
   * @returns 
   * @throws NotFoundError if album not found or empty
   */
  public async getAlbum(id: ID): Promise<GetAlbumResponse> {
    const album = await this.albumRepository.get(id);

    if (typeof album === 'undefined') {
      throw new NotFoundError('Album not found!', 404);
    }

    const response = await this.uploadService.listFiles(album.files);
  
    const fullMedia = await Promise.all(album.files.map(async (id) => {
      const file = response.data.files.find(file => file.id === id);
      
      return {
        id,
        location: file.location,
        mimetype: file.mimetype,
        metadata: {
          width: file.metadata.width,
          height: file.metadata.height,
        },
        thumbnails: file.thumbnails,
        conversions: file.conversions,
      }
    }));

    return {
      id: album.id,
      media: fullMedia,
    };
  }

  /**
   * 
   * @param user 
   * @returns 
   */
  public async createAlbum(user: User | undefined): Promise<Album> {
    logger.debug(`${this.constructor.name}.create`, { user });

    const album = await this.albumRepository.create({ user: { id: user.id } });

    if (typeof user !== 'undefined') {
      const u = await this.userRepository.get(user.id);

      const albums = typeof u === 'undefined' ? [ album.id ] : [ album.id, ...u.albums ];

      await this.userRepository.update({ albums }, { id: user.id });
    }

    return album;
  }

  public async deleteAlbum(id: ID, user: User): Promise<Album> {
    logger.debug(`${this.constructor.name}.delete`, { id, user });

    const album = await this.albumRepository.get(id);

    if (typeof album === 'undefined') {
      throw new NotFoundError('Album not found!', 404);
    }

    setImmediate(async () => {
      for(const id of album.files) {
        logger.info(`Deleting file ${id}...`);
        await this.uploadService.deleteFile(id, user.token).catch((error: Error) => {
          logger.error(`Error deleting file ${id}!`, { message: error.message, stack: error.stack });
        });
      }
    });

    const { albums } = await this.userRepository.get(album.user.id);

    await this.userRepository.update({ albums: albums.filter(a => a !== album.id) }, { id: user.id });

    await this.albumRepository.delete(id);

    return album;
  }

  public async updateAlbum(id: ID, user: User, params: { files?: ID[], name?: string, description?: string }): Promise<Album> {
    logger.debug(`${this.constructor.name}.update`, { id, user, params });

    const album = await this.albumRepository.get(id);

    if (typeof album === 'undefined') {
      throw new NotFoundError('Album not found!', 404);
    }

    if (album.user.id !== user.id) {
      throw new ForbiddenError('Album does not belong to you!', 403);
    }

    const updated = await this.albumRepository.update(params, { id });

    return updated;
  }
}

export default Albums;
