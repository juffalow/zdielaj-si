export default interface AlbumRepository {
  get(id: string): Promise<Album>;

  create(userId: number): Promise<Album>;
}
