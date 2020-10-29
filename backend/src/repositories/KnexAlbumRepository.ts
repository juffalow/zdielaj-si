import crypto from 'crypto';
import AlbumRepository from './AlbumRepository';
import database from '../database';

class KnexAlbumRepository implements AlbumRepository {
  public async get(id: string): Promise<Album> {
    return new Promise((resolve, reject) => {
      database.select()
        .from('album')
        .where('id', id)
        .first()
        .then(album => resolve(album))
        .catch(err => reject(err));
    });
  }

  public async create(): Promise<Album> {
    return new Promise((resolve, reject) => {
      const id = crypto.randomBytes(8).toString('hex');
      database.insert({
        id,
      })
      .into('album')
      .then(() => {
        resolve({ id });
      }).catch(err => {
        console.error(err);
        return this.create();
      });
    });
  }
}

export default KnexAlbumRepository;
