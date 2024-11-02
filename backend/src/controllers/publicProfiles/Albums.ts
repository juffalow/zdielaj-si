import { BaseError } from '../../utils/errors';
import logger from '../../logger';

class Albums {
  constructor(
    protected userRepository: UserRepository,
    protected publicProfileRepository: PublicProfileRepository,
    protected albumRepository: AlbumRepository,
    protected uploadService: Services.Upload,
  ) {}

  public async list(publicProfileId: ID, first: number, after: number): Promise<{ albums: any[] }> {
    const publicProfile = await this.publicProfileRepository.get(publicProfileId);
    const user = await this.userRepository.get(publicProfile.user.id);

    if (typeof user === 'undefined') {
      throw new BaseError({ message: 'User not found!', code: 404 });
    }

    const albums = await Promise.all(user.albums.slice(after, first > user.albums.length ? user.albums.length : first).map(async (id) => {
      try {
        const album = await this.albumRepository.get(id);

        const response = await this.uploadService.getFile(album.files[0]);
        
        return {
          id,
          compressedId: album.compressedId,
          media:[{
            id: response.data.file.id,
            location: response.data.file.location,
            mimetype: response.data.file.mimetype,
            thumbnails: response.data.file.thumbnails,
          }],
          createdAt: album.createdAt,
        };
      } catch (error) {
        logger.warn('Error while fetching album', { id, error });

        return null;
      }
    }));

    return {
      albums: albums.filter((album) => album !== null),
    };
  }
}

export default Albums;
