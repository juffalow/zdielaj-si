import PhotoRepository from './PhotoRepository';
import array from './Array';

export default class ArrayPhotoRepository implements PhotoRepository {
  public async find(albumId: string): Promise<Array<Photo>> {
    return array.getPhotos(albumId);
  }

  public async create(albumId: string, path: string, size: number): Promise<Photo> {
    return array.createPhoto(albumId, path, size);
  }
}
