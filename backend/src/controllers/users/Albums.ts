import { NotFoundError } from '../../errors/APIError';

class Albums {
  constructor(
    protected userRepository: UserRepository,
    protected albumRepository: AlbumRepository,
    protected uploadService: Services.Upload,
  ) {}

  public async list(user: User, first: number, after: number): Promise<{ albums: any[] }> {
    const dbUser = await this.userRepository.get(user.id);

    if (typeof dbUser === 'undefined') {
      throw new NotFoundError('User not found!', 404);
    }

    const albums = await this.albumRepository.getMany(dbUser.albums.slice(after, after + (first > dbUser.albums.length ? dbUser.albums.length : first)));

    const files = await this.uploadService.listFiles(albums.filter(album => album.files.length > 0).map((album) => album.files[0]));

    const albumsWithFile = albums.filter(album => album.files.length > 0).map((album: Album) => {        
      return {
        id: album.id,
        compressedId: album.compressedId,
        publicProfile: album.publicProfile,
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
}

export default Albums;
