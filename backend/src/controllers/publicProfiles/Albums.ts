import { NotFoundError, ForbiddenError } from '../../errors/APIError';

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

    const albums = await this.albumRepository.getMany(publicProfile.albums.slice(after, after + (first > publicProfile.albums.length ? publicProfile.albums.length : first)));

    const files = await this.uploadService.listFiles(albums.filter(album => album.files.length > 0).map((album) => album.files[0]));

    const albumsWithFile = albums.filter(album => album.files.length > 0).map((album: Album) => {        
      return {
        id: album.id,
        compressedId: album.compressedId,
        media: files.data.files.filter(file => file.id === album.files[0]).map((file) => ({
          id: file.id,
          location: file.location,
          mimetype: file.mimetype,
          thumbnails: file.thumbnails,
        })),
        name: album.name,
        createdAt: album.createdAt,
      };
    });

    return {
      albums: albumsWithFile.filter((album) => album !== null),
    };
  }

  public async add(user: User, publicProfileId: ID, albumId: ID): Promise<boolean> {
    const publicProfile = await this.publicProfileRepository.get(publicProfileId);
    const dbUser = await this.userRepository.get(user.id);
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

    const albums = Array.from((new Set(publicProfile.albums)).add(albumId)).sort((a, b) => dbUser.albums.indexOf(a) - dbUser.albums.indexOf(b));

    if (publicProfile.albums.length === albums.length) {
      return false;
    }

    await this.publicProfileRepository.update({ albums }, { id: publicProfile.id });
    await this.albumRepository.update({ publicProfile: { id: publicProfile.id } }, { id: album.id });

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
    await this.albumRepository.update({ publicProfile: null }, { id: albumId });

    return true;
  }
}

export default Albums;
