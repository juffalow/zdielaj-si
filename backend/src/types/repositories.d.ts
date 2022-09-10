declare namespace AlbumRepository {

}

interface AlbumRepository {
  get(id: string): Promise<Album>;

  create(userId: number): Promise<Album>;
}

declare namespace MediaRepository {

}

interface MediaRepository {
  create(albumId: string, mediaId: number): Promise<Media>;

  find(albumId: string): Promise<Array<Media>>;

  count(albumId: string): Promise<number>;
}

declare namespace RefreshTokenRepository {

}

interface RefreshTokenRepository {
  get(userId: number, token: string): Promise<RefreshToken>;

  create(userId: number, token: string, expiresAt: number): Promise<RefreshToken>;

  delete(userId: number, token: string): Promise<void>;
}

declare namespace UserRepository {
  interface CreateParameters {
    name: string;
    email: string;
    password: string;
    token: string;
  }
  
  interface UpdateParameters {
    id: number;
    token?: string | null;
    isActive?: 0 | 1;
  }
}

interface UserRepository {
  get(id: number): Promise<User>;
  
  getByEmail(email: string): Promise<User>;

  create(params: UserRepository.CreateParameters): Promise<User>;

  update(params: UserRepository.UpdateParameters): Promise<User>;
}
