export default interface MediaRepository {
  create(albumId: string, mediaId: number): Promise<Media>;

  find(albumId: string): Promise<Array<Media>>;

  count(albumId: string): Promise<number>;
}
