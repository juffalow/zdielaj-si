export default interface AlbumRepository {
  create(albumId: string, path: string, size: number): Promise<Photo>;

  createThumbnail(albumId: string, photoId: string, path: string, size: number): Promise<Photo>;

  find(albumId: string): Promise<Array<Photo>>;
}
