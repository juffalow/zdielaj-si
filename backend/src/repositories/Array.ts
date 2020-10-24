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
    };

    photos[albumId].push(photo);

    return photo;
  },
  createPhotoThumbnail: (albumId: string, photoId: string, path: string, size: number): any => {
    photos[albumId] = photos[albumId].map((photo) => {
      if (photo.id === photoId) {
        return {
          ...photo,
          thumbnail: {
            path,
            size,
          }
        }
      }
      return photo;
    });

    return { path, size };
  },
  getPhotos(albumId: string): Array<Photo> {
    return photos[albumId];
  }
}
