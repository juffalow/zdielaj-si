import crypto from 'crypto';
import { BaseError } from '../utils/errors';
import logger from '../logger';

class AlbumsController {
  constructor(
    protected albumRepository: AlbumRepository,
    protected mediaRepository: MediaRepository,
    protected uploadService: Services.Upload,
  ) {}

  /**
   * Retrieves single album with specified ID.
   * @param id 
   * @returns 
   * @throws BaseError if album not found or empty
   */
  public async getAlbum(id: ID): Promise<Album> {
    const albums = await this.albumRepository.find({ hash: String(id), first: 1 });
    const album = albums.length === 1 ? albums.shift() : await this.albumRepository.get(id);

    if (typeof album === 'undefined') {
      throw new BaseError({message: 'Album not found!', code: 404 });
    }

    const media = await this.mediaRepository.find({ album: { id: album.id } });

    const response = await this.uploadService.listFiles(media.map(single => single.fileId));
  
    const fullMedia = await Promise.all(media.map(async (single) => {
      const file = response.data.files.find(file => file.id === single.fileId);
      
      return {
        ...single,
        ...file,
      }
    }));

    return {
      ...album,
      media: fullMedia,
    };
  }

  /**
   * Retrieves albums owned by user.
   * @param user 
   * @returns 
   */
  public async getAlbums(params: { user?: User, publicProfile?: PublicProfile, first?: number, after?: number }): Promise<Album[]> {
    const albums = await this.albumRepository.find(params);

    const albumsWithThumbnails = await Promise.all(albums.map(async (album) => {
      const media = await this.mediaRepository.find({ album: { id: album.id }, first: 1 });

      if (media.length === 0) {
        return undefined;
      }

      const response = await this.uploadService.getFile(media[0].fileId);

      return {
        ...album,
        media: [{
          ...media,
          ...response.data.file,
        }],
      } as any;

    }));

    return albumsWithThumbnails.filter(album => typeof album !== 'undefined');
  }

  /**
   * 
   * @param user 
   * @returns 
   */
  public async createAlbum(user: User | null): Promise<Album> {
    let attempt = 0;
    let album = null;

    do {
      try {
        const hash = crypto.randomBytes(4).toString('hex');
        album = await this.albumRepository.create(user !== null && typeof user !== 'undefined' ? user.id : null, hash);
        break;
      } catch (err) {
        attempt++;
      }
    } while (attempt < 10);

    if (album === null) {
      throw new BaseError({ message: 'Unable to create album!', code: 500 });
    }

    return album;
  }

  public async deleteAlbum(id: number): Promise<Album> {
    const media = await this.mediaRepository.find({ album: { id } });

    setImmediate(async () => {
      for(const single of media) {
        logger.info(`Deleting media ${single.fileId}...`);
        await this.uploadService.deleteFile(single.fileId);
      }
    });

    const album = await this.albumRepository.delete(id);

    if (typeof album === 'undefined') {
      throw new BaseError({message: 'Album not found!', code: 404 });
    }

    return album;
  }
}

export default AlbumsController;
