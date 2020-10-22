export default interface AlbumRepository {
  get(id: string): Promise<Album>;

  create(): Promise<Album>;
}
