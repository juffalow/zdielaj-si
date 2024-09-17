import { BaseError } from '../utils/errors';
// import logger from '../logger';

class Users {
  constructor(
    protected userRepository: UserRepository,
    protected albumRepository: AlbumRepository,
    protected uploadService: Services.Upload,
  ) {}

  public async get(id: ID): Promise<unknown> {
    const user = await this.userRepository.get(id);

    if (typeof user === 'undefined') {
      throw new BaseError({ message: 'User not found!', code: 404 });
    }
  
    const albums = await Promise.all(user.albums.map(async (id) => {
      const album = await this.albumRepository.get(id);

      const response = await this.uploadService.getFile(album.files[0]);
      
      return {
        id,
        media:[{
          id: response.data.file.id,
          location: response.data.file.location,
          mimetype: response.data.file.mimetype,
          thumbnails: response.data.file.thumbnails,
        }],
        createdAt: album.createdAt,
      }
    }));

    return {
      id: user.id,
      albums,
    };
  }
}

export default Users;
