declare namespace AlbumRepository {
  interface FindParameters {
    user?: {
      id: ID;
    },
    hash?: string;
    first?: number;
    after?: number;
  }
}

interface AlbumRepository {
  get(id: ID): Promise<Album>;

  create(userId: ID, hash: string): Promise<Album>;

  find(params: AlbumRepository.FindParameters): Promise<Album[]>;

  delete(id: ID): Promise<Album>;
}

declare namespace MediaRepository {
  interface FindParameters {
    album: {
      id: ID;
    },
    first?: number;
    after?: number;
  }

  interface CountParameters {
    album: {
      id: ID;
    },
  }
}

interface MediaRepository {
  create(albumId: ID, fileId: ID): Promise<Media>;

  find(params: MediaRepository.FindParameters): Promise<Array<Media>>;

  count(params: MediaRepository.FindParameters): Promise<number>;
}
