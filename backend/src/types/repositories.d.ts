declare namespace AlbumRepository {
  interface CreateParameters {
    id?: ID;
    user?:{
      id: ID;
    };
  }

  interface UpdateParameters {
    files?: ID[];
    name?: string;
    description?: string;
    shortLink?: {
      path: string;
    };
    publicProfile?: {
      id: ID;
    };
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

  getMany(ids: ID[]): Promise<Album[]>;

  create(params: AlbumRepository.CreateParameters): Promise<Album>;

  update(params: AlbumRepository.UpdateParameters, where: { id: ID }): Promise<Album>;

  delete(id: ID): Promise<Album>;
}

declare namespace PublicProfileRepository {
  interface CreateParameters {
    id: ID;
    user: {
      id: ID;
    };
    name: string;
    description: string;
  }

  interface UpdateParameters {
    name?: string;
    description?: string;
    albums?: ID[];
  }
}

interface PublicProfileRepository {
  get(id: ID): Promise<PublicProfile>;

  create(params: PublicProfileRepository.CreateParameters): Promise<PublicProfile>;

  update(params: PublicProfileRepository.UpdateParameters, where: { id: ID }): Promise<PublicProfile>;

  delete(id: ID): Promise<PublicProfile>;
}

declare namespace UserRepository {
  interface CreateParameters {
    id: ID;
    albums?: ID[];
    publicProfiles?: ID[];
  }

  interface UpdateParameters {
    user?: {
      id: ID;
    };
    albums?: ID[];
    publicProfileId?: ID;
  }
}

interface UserRepository {
  get(id: ID): Promise<User | undefined>;

  create(params: UserRepository.CreateParameters): Promise<User>;

  update(params: UserRepository.UpdateParameters, where: { id: ID }): Promise<User>;

  delete(id: ID): Promise<User>;
}

interface ShortLinkRepository {
  get(path: string): Promise<ShortLink>;

  create(params: { path: string, albumId: ID }): Promise<ShortLink>;

  delete(path: string): Promise<ShortLink>;
}
