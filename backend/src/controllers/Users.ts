import { BaseError } from '../utils/errors';
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
      throw new BaseError({ message: 'User not found!', code: 404 });
    }
  
    const albums = await Promise.all(user.albums.map(async (id) => {
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
      ...user,
      email: remoteUser.email,
      name: remoteUser.name,
      albums: albums.filter((album) => album !== null),
    };
  }
}

export default Users;
