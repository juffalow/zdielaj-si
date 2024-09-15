import { BaseError } from '../utils/errors';
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
   * @throws BaseError if album not found or empty
   */
  public async getAlbum(id: ID): Promise<GetAlbumResponse> {
    const album = await this.albumRepository.get(id);

    if (typeof album === 'undefined') {
      throw new BaseError({ message: 'Album not found!', code: 404 });
    }

    const response = await this.uploadService.listFiles(album.files);
  
    const fullMedia = await Promise.all(album.files.map(async (id) => {
      const file = response.data.files.find(file => file.id === id);

      console.log();
      console.log('file', file);
      console.log();
      
      return {
        id,
        location: file.location,
        mimetype: file.mimetype,
        metadata: {
          width: file.metadata.width,
          height: file.metadata.height,
        },
        thumbnails: [{
          location: 'https://d1zcbk2j8t91y7.cloudfront.net/generated/400x400/' + file['path'],
        }]
      }
    }));

    return {
      id: album.id,
      media: fullMedia,
    };
  }

  /**
   * Retrieves albums owned by user.
   * @param user 
   * @returns 
   */
  // public async getAlbums(params: { user?: User, publicProfile?: PublicProfile, first?: number, after?: number }): Promise<Album[]> {
  public async getAlbums(): Promise<Album[]> {
    // const albums = await this.albumRepository.find(params);

    // const albumsWithThumbnails = await Promise.all(albums.map(async (album) => {
    //   const media = await this.mediaRepository.find({ album: { id: album.id }, first: 1 });

    //   if (media.length === 0) {
    //     return undefined;
    //   }

    //   const response = await this.uploadService.getFile(media[0].fileId);

    //   return {
    //     ...album,
    //     media: [{
    //       ...media,
    //       ...response.data.file,
    //     }],
    //   } as any;

    // }));

    // return albumsWithThumbnails.filter(album => typeof album !== 'undefined');

    return [];
  }

  /**
   * 
   * @param user 
   * @returns 
   */
  public async createAlbum(user: User | undefined): Promise<Album> {
    logger.debug(`${this.constructor.name}.create`, { user });

    const album = await this.albumRepository.create({ user });

    if (typeof user !== 'undefined') {
      const u = await this.userRepository.get(user.id);

      const albums = typeof u === 'undefined' ? [ album.id ] : [ ...u.albums, album.id ];

      await this.userRepository.update({ albums }, { id: user.id });
    }

    return album;
  }

  public async deleteAlbum(id: ID): Promise<Album> {
    const album = await this.albumRepository.get(id);

    if (typeof album === 'undefined') {
      throw new BaseError({message: 'Album not found!', code: 404 });
    }

    setImmediate(async () => {
      for(const id of album.files) {
        logger.info(`Deleting file ${id}...`);
        await this.uploadService.deleteFile(id);
      }
    });

    await this.albumRepository.delete(id);

    return album;
  }
}

export default Albums;
