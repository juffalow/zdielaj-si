declare namespace AlbumRepository {
  interface FindParameters {
    user?: {
      id: ID;
    },
    publicProfile?: {
      id: ID;
    };
    hash?: string;
    orderBy?: OrderBy[];
    first?: number;
    after?: number;
  }

  interface CountParameters {
    user?: {
      id: ID;
    };
    publicProfile?: {
      id: ID;
    };
    hash?: string;
  }
}

interface AlbumRepository {
  get(id: ID): Promise<Album>;

  create(userId: ID, hash: string): Promise<Album>;

  find(params: AlbumRepository.FindParameters): Promise<Album[]>;

  count(params: AlbumRepository.CountParameters): Promise<number>;

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

declare namespace PublicProfileRepository {
  interface CreateParameters {
    user?: {
      id: ID;
    };
    name: string;
    slug: string;
    description: string;
  }

  interface FindParameters {
    user?: {
      id: ID;
    };
    name?: string;
    slug?: string;
    first?: number;
    after?: number;
  }

  interface CountParameters {
    user?: {
      id: ID;
    };
    name?: string;
    slug?: string;
  }
}

interface PublicProfileRepository {
  get(id: ID): Promise<PublicProfile>;

  create(params: PublicProfileRepository.CreateParameters): Promise<PublicProfile>;

  find(params: PublicProfileRepository.FindParameters): Promise<PublicProfile[]>;

  count(params: PublicProfileRepository.CountParameters): Promise<number>;

  delete(id: ID): Promise<PublicProfile>;
}