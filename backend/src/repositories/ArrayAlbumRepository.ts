import AlbumRepository from './AlbumRepository';
import array from './Array';

export default class ArrayAlbumRepository implements AlbumRepository {
  public async get(id: string): Promise<Album> {
    return array.getAlbum(id);
  }

  public async create(): Promise<Album> {
    return array.createAlbum();
  }
}