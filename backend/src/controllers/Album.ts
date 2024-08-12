import crypto from 'crypto';
import { BaseError } from '../utils/errors';

class AlbumController {
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
  public async getAlbum(id: number): Promise<Album> {
    const album = await this.albumRepository.get(id);
    const media = await this.mediaRepository.find({ album: { id: album.id } });
  
    if (typeof media === 'undefined' || media.length === 0) {
      throw new BaseError({message: 'Album not found!', code: 404 });
    }

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
   * Retrieves single album with specified hash.
   * @param hash 
   * @returns 
   * @throws BaseError if album not found or empty
   */
  public async getAlbumByHash(hash: string): Promise<Album> {
    const albums = await this.albumRepository.find({ hash, first: 1 });
    const album = albums.shift();
    const media = await this.mediaRepository.find({ album: { id: album.id } });
  
    if (typeof media === 'undefined' || media.length === 0) {
      throw new BaseError({message: 'Album not found!', code: 404 });
    }
    
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
  public async getAlbums(user: User): Promise<Album[]> {
    const albums = await this.albumRepository.find({ user: { id: user.id } });

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
}

export default AlbumController;
