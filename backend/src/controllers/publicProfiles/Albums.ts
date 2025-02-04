import { NotFoundError, ForbiddenError } from '../../errors/APIError';
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

    if (typeof publicProfile === 'undefined') {
      throw new NotFoundError('Public profile not found!', 404);
    }

    const albs = await this.albumRepository.getMany(publicProfile.albums.slice(after, first > publicProfile.albums.length ? publicProfile.albums.length : first));

    const albumsWithFile = await Promise.all(albs.map(async (album: Album) => {
      try {
        const response = await this.uploadService.getFile(album.files[0]);
        
        return {
          id: album.id,
          compressedId: album.compressedId,
          media:[{
            id: response.data.file.id,
            location: response.data.file.location,
            mimetype: response.data.file.mimetype,
            thumbnails: response.data.file.thumbnails,
          }],
          name: album.name,
          createdAt: album.createdAt,
        };
      } catch (error) {
        logger.warn('Error while fetching album', { album, error });

        return null;
      }
    }));

    return {
      albums: albumsWithFile.filter((album) => album !== null),
    };
  }

  public async add(user: User, publicProfileId: ID, albumId: ID): Promise<boolean> {
    const publicProfile = await this.publicProfileRepository.get(publicProfileId);
    const album = await this.albumRepository.get(albumId);

    if (typeof publicProfile === 'undefined') {
      throw new NotFoundError('Public profile not found!', 404);
    }

    if (typeof album === 'undefined') {
      throw new NotFoundError('Album not found!', 404);
    }

    if (publicProfile.user.id !== user.id) {
      throw new ForbiddenError('Public profile does not belong to you!', 403);
    }

    if (album.user.id !== publicProfile.user.id) {
      throw new ForbiddenError('Album does not belong to you!', 403);
    }

    if (publicProfile.albums instanceof Array === false) {
      publicProfile.albums = [];
    }

    const albums = Array.from((new Set(publicProfile.albums)).add(albumId));

    if (publicProfile.albums.length === albums.length) {
      return false;
    }

    await this.publicProfileRepository.update({ albums }, { id: publicProfile.id });

    return true;
  }

  public async remove(user: User, publicProfileId: ID, albumId: ID): Promise<boolean> {
    const publicProfile = await this.publicProfileRepository.get(publicProfileId);

    if (typeof publicProfile === 'undefined') {
      throw new NotFoundError('Public profile not found!', 404);
    }

    if (publicProfile.user.id !== user.id) {
      throw new ForbiddenError('Public profile does not belong to you!', 403);
    }

    const albums = publicProfile.albums.filter((id) => id !== albumId);

    if (publicProfile.albums.length === albums.length) {
      return false;
    }

    await this.publicProfileRepository.update({ albums }, { id: publicProfile.id });

    return true;
  }
}

export default Albums;
