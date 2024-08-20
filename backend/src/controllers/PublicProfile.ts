import { BaseError } from '../utils/errors';
import logger from '../logger';

class PublicProfileController {
  constructor(
    protected publicProfileRepository: PublicProfileRepository,
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
      throw new BaseError({message: 'Public profile not found!', code: 404 });
    }

    return publicProfile;
  }

  public async find(params: any): Promise<PublicProfile[]> {
    const publicProfiles = await this.publicProfileRepository.find(params);

    return publicProfiles;
  }

  public async create(params: any, user: User): Promise<PublicProfile> {
    const publicProfile = await this.publicProfileRepository.create({
      userId: user.id,
      ...params,
    });

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

export default PublicProfileController;
