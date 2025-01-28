import { NotFoundError } from '../errors/APIError';
import logger from '../logger';

class Users {
  constructor(
    protected userRepository: UserRepository,
    protected albumRepository: AlbumRepository,
    protected uploadService: Services.Upload,
    protected userService: Services.User,
  ) {}

  public async get(id: ID, token?: string): Promise<unknown> {
    const remoteUser = await this.userService.get(token);
    const user = await this.userRepository.get(id);

    if (typeof user === 'undefined') {
      throw new NotFoundError('User not found!', 404);
    }
  
    const albums = await Promise.all(user.albums.map(async (id) => {
      try {
        const album = await this.albumRepository.get(id);

        if (album.files.length === 0) {
          logger.warn('Album has no files!', { album: { id: album.id }, user: { id} });

          return null;
        }

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
        logger.error('Error while fetching album or its files!', { id, error });

        return null;
      }
    }));

    return {
      ...user,
      email: remoteUser.email,
      name: remoteUser.name,
      albums: albums.filter((album) => album !== null),
    };
  }
}

export default Users;
