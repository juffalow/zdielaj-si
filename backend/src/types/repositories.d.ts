declare namespace AlbumRepository {
  interface FindParameters {
    user?: {
      id: number;
    },
    hash?: string;
    first?: number;
    after?: number;
  }
}

interface AlbumRepository {
  get(id: number): Promise<Album>;

  create(userId: number, hash: string): Promise<Album>;

  find(params: AlbumRepository.FindParameters): Promise<Album[]>;
}

declare namespace MediaRepository {
  interface FindParameters {
    album: {
      id: string;
    },
    first?: number;
    after?: number;
  }

  interface CountParameters {
    album: {
      id: string;
    },
  }
}

interface MediaRepository {
  create(albumId: string, fileId: number): Promise<Media>;

  find(params: MediaRepository.FindParameters): Promise<Array<Media>>;

  count(params: MediaRepository.FindParameters): Promise<number>;
}
