import { NotFoundError } from '../errors/APIError';

class Users {
  constructor(
    protected userRepository: UserRepository,
    protected publicProfileRepository: PublicProfileRepository,
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

    return {
      ...user,
      email: remoteUser.email,
      name: remoteUser.name,
    };
  }
}

export default Users;
