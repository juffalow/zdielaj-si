const albums = {};

const photos = {};

export default {
  createAlbum: (): Album => {
    let hash = null;
    do {
      hash = Math.random().toString(36).substring(7);
    } while(hash in albums);

    albums[hash] = { id: hash, createdAt: '' };

    return albums[hash];
  },
  getAlbum: (id: string): Album => {
    return albums[id];
  },
  createPhoto: (albumId: string, path: string, size: number): Photo => {
    if (!(albumId in photos)) {
      photos[albumId] = [];
    }

    const photo = {
      id: Math.random().toString(36).substring(7),
      albumId,
      path,
      size,
    }

    photos[albumId].push(photo);

    return photo;
  },
  getPhotos(albumId: string): Array<Photo> {
    return photos[albumId];
  }
}
