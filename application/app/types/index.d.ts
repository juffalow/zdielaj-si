type ID = string;

type AlbumFile = {
  id: ID;
  location: string;
  mimetype: string;
  size: number;
  metadata: {
    width: number;
    height: number
    [key: string]: unknown;
  };
  thumbnails: string[];
  uploadUrl?: string;
  createdAt: string;
}

type AlbumLayout = 'cols' | 'rows' | 'tiles';
type AlbumGaps = 'none' | 'small' | 'medium' | 'large';
type AlbumRetention = '1' | '7' | '31' | '366' | '0';

type Album = {
  id: ID;
  user: {
    id: ID;
  };
  publicProfile: {
    id: ID;
  } | null;
  shortLink?: {
    path: string;
  };
  name?: string;
  description?: string;
  media: AlbumFile[];
  files: AlbumFile[];
  layout: AlbumLayout;
  gaps: AlbumGaps;
  retention: AlbumRetention;
  changeLayout: boolean;
  createdAt: string;
  updatedAt: string;
  token: string;
}

type User = {
  id?: ID;
  username?: string;
  email?: string;
  name?: string;
  accessToken: string;
  idToken: string;
  meta?: Record<string, string | number | boolean>;
  publicProfileId?: ID;
  statistics?: {
    albums: number;
    files: number;
    totalSize: number;
  };
}

type PublicProfile = {
  id: ID;
  user?: {
    id: ID;
  };
  name: string;
  description: string;
  contact?: {
    homepage?: string;
    facebook?: string;
    instagram?: string;
    pinterest?: string;
    strava?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
