type ID = string;

type Media = {
  id: number;
  path: string;
  location: string;
  mimetype: string;
  size: number;
  metadata: {
    width: number;
    height: number
    [key: string]: unknown;
  };
  thumbnails: string[];
  createdAt: string;
}

type Album = {
  id: string;
  compressedId?: string;
  user: {
    id: ID;
  };
  publicProfile: {
    id: ID;
  } | null;
  name?: string;
  description?: string;
  media: Media[];
  createdAt: string;
}

type User = {
  id?: ID;
  username?: string;
  email?: string;
  name?: string;
  accessToken: string;
  meta?: Record<string, string | number | boolean>;
  publicProfileId?: ID;
}

type PublicProfile = {
  id: ID;
  user?: {
    id: ID;
  };
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

type NotificationType =
  'login' |
  'product' |
  'register';

type NotificationSetting = {
  id: number;
  type: 'email' | 'inapp';
  notification: string;
  isEnabled: boolean,
}
