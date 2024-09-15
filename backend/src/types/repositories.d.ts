declare namespace AlbumRepository {
  interface CreateParameters {
    id?: ID;
    user?:{
      id: ID;
    };
  }

  interface UpdateParameters {
    files: ID[];
  }

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

  create(params: AlbumRepository.CreateParameters): Promise<Album>;

  update(params: AlbumRepository.UpdateParameters, where: { id: ID }): Promise<Album>;

  delete(id: ID): Promise<Album>;
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
}

interface PublicProfileRepository {
  get(id: ID): Promise<PublicProfile>;

  create(params: PublicProfileRepository.CreateParameters): Promise<PublicProfile>;

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
    publicProfiles?: ID[];
  }
}

interface UserRepository {
  get(id: ID): Promise<User | undefined>;

  create(params: UserRepository.CreateParameters): Promise<User>;

  update(params: UserRepository.UpdateParameters, where: { id: ID }): Promise<User>;

  delete(id: ID): Promise<User>;
}