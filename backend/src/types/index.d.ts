interface Media {
  id: number;
  albumId: string;
  mediaId: number;
}

interface Photo {
  id: string;
  albumId: string;
  mimetype?: string;
  path: string;
  size: number;
  thumbnail?: any;
}

interface Album {
  id: string;
  userId?: number;
  createdAt?: string;
}

interface RefreshToken {
  id: number;
  userId: number;
  token: string;
  createdAt: string;
  expiresAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}
