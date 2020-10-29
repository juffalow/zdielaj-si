import crypto from 'crypto';
import PhotoRepository from './PhotoRepository';
import database from '../database';

class KnexPhotoRepository implements PhotoRepository {
  public async find(albumId: string): Promise<Array<Photo>> {
    return new Promise((resolve, reject) => {
      database.select(database.raw('photo.id AS id, photo.path AS path, photo.size AS size, thumbnail.id AS thumbnailId, thumbnail.path AS thumbnailPath, thumbnail.size AS thumbnailSize'))
        .from('photo')
        .leftJoin('thumbnail', 'photo.id', 'thumbnail.photoId')
        .where('albumId', albumId)
        .then((photos: Array<any>) => {
          resolve(photos.map(photo => {
            return {
              id: photo.id,
              albumId,
              path: photo.path,
              size: photo.size,
              thumbnail: photo.thumbnailId !== null ? {
                id: photo.thumbnailId,
                path: photo.thumbnailPath,
                size: photo.thumbnailSize,
              } : null,
            };
          }));
        })
        .catch(err => reject(err));
    });
  }

  public async create(albumId: string, path: string, size: number): Promise<Photo> {
    return new Promise((resolve, reject) => {
      const id = crypto.randomBytes(8).toString('hex');
      database.insert({
        id,
        albumId,
        path,
        size,
      })
      .into('photo')
      .then(() => {
        resolve({ id, albumId, path, size });
      }).catch(err => {
        console.error(err);
        return this.create(albumId, path, size);
      });
    });
  }

  public async createThumbnail(albumId: string, photoId: string, path: string, size: number): Promise<Photo> {
    return new Promise((resolve, reject) => {
      const id = crypto.randomBytes(8).toString('hex');
      database.insert({
        id,
        photoId,
        path,
        size,
      })
      .into('thumbnail')
      .then((ids: any[]) => {
        resolve({ id, albumId, path, size });
      }).catch(err => {
        console.error(err);
        return this.createThumbnail(albumId, photoId, path, size);
      });
    });
  }
}

export default KnexPhotoRepository;
