import { BaseError } from '../utils/errors';

class PublicProfilesController {
  constructor(
    protected publicProfileRepository: PublicProfileRepository,
    protected userRepository: UserRepository,
  ) {}

  /**
   * Retrieves single public profile with specified ID.
   * @param id 
   * @returns 
   * @throws BaseError if public profile not found or empty
   */
  public async get(id: ID): Promise<PublicProfile> {
    const publicProfile = await this.publicProfileRepository.get(id);

    if (typeof publicProfile === 'undefined') {
      throw new BaseError({ message: 'Public profile not found!', code: 404 });
    }
    
    return publicProfile;
  }

  public async create(params: any, user: User): Promise<PublicProfile> {
    const u = await this.userRepository.get(user.id);

    if (typeof u.publicProfileId !== 'undefined' && u.publicProfileId !== null) {
      throw new BaseError({ message: 'User already has a public profile!', code: 400 });
    }

    const publicProfile = await this.publicProfileRepository.create({
      user: {
        id: user.id,
      },
      ...params,
    });

    await this.userRepository.update({
      publicProfileId: publicProfile.id,
    }, { id: user.id });

    return publicProfile;
  }

  public async update(id: ID, params: any, user: User): Promise<PublicProfile> {
    const u = await this.userRepository.get(user.id);

    if (u.publicProfileId !== id) {
      throw new BaseError({ message: 'Cannot update specific public profile!', code: 403 });
    }

    const publicProfile = await this.publicProfileRepository.update(params, { id });

    return publicProfile;
  }

  public async delete(id: ID): Promise<PublicProfile> {
    const publicProfile = await this.publicProfileRepository.delete(id);

    if (typeof publicProfile === 'undefined') {
      throw new BaseError({message: 'Public profile not found!', code: 404 });
    }

    return publicProfile;
  }
}

export default PublicProfilesController;
