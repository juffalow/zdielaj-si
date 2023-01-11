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
  public async getAlbum(id: string): Promise<Album> {
    const album = await this.albumRepository.get(id);
    const media = await this.mediaRepository.find(id);
  
    if (typeof media === 'undefined' || media.length === 0) {
      throw new BaseError({message: 'Album not found!', code: 404 });
    }
  
    const fullMedia = await Promise.all(media.map(async (single) => {
      const response = await this.uploadService.getFile(single.mediaId);
      
      return {
        ...single,
        ...response.data.file,
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
    return null;
  }

  /**
   * 
   * @param user 
   * @returns 
   */
  public async createAlbum(user: User | null): Promise<Album> {  
    const album = await this.albumRepository.create(user !== null && typeof user !== 'undefined' ? user.id : null);

    return album;
  }
}

export default AlbumController;
