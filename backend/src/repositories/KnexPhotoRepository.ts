import crypto from 'crypto';
import PhotoRepository from './PhotoRepository';
import database from '../database';
import logger from '../logger';

class KnexPhotoRepository implements PhotoRepository {
  public async find(albumId: string): Promise<Array<Photo>> {
    return new Promise((resolve, reject) => {
      database.select(database.raw('photo.id AS id, photo.mimetype as mimetype, photo.path AS path, photo.size AS size, thumbnail.id AS thumbnailId, thumbnail.path AS thumbnailPath, thumbnail.size AS thumbnailSize'))
        .from('photo')
        .leftJoin('thumbnail', 'photo.id', 'thumbnail.photoId')
        .where('albumId', albumId)
        .then((photos: Array<any>) => {
          resolve(photos.map(photo => {
            return {
              id: photo.id,
              albumId,
              mimetype: photo.mimetype,
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

  public async count(albumId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      database.count({ count: '*' })
        .from('photo')
        .where('albumId', albumId)
        .first()
        .then((result: any) => resolve(result.count))
        .catch(err => reject(err));
    });
  }

  public async create(albumId: string, mimetype: string, path: string, size: number): Promise<Photo> {
    return new Promise((resolve, reject) => {
      const id = crypto.randomBytes(8).toString('hex');
      database.insert({
        id,
        albumId,
        mimetype,
        path,
        size,
      })
      .into('photo')
      .then(() => {
        resolve({ id, albumId, mimetype, path, size });
      }).catch(err => {
        console.error(err);
        return this.create(albumId, mimetype, path, size);
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
      .then(() => {
        resolve({ id, albumId, path, size });
      }).catch(err => {
        logger.error('Cannot create thumbnail!', { error: { message: err.message, stack: err.stack } });
        return this.createThumbnail(albumId, photoId, path, size);
      });
    });
  }
}

export default KnexPhotoRepository;
