type Thumbnail = {
  id: number;
  path: string;
  location: string;
  mimetype: string;
  metadata: unknown;
  size: number;
  createdAt: string;
}

type Media = {
  id: number;
  path: string;
  location: string;
  mimetype: string;
  size: number;
  metadata: unknown;
  thumbnails: Thumbnail[];
  createdAt: string;
}

type Album = {
  id: string;
  userId?: number;
  hash: string;
  media: Media[];
  createdAt: string;
}

type User = {
  id?: number;
  token: string;
  meta?: Record<string, string | number | boolean>;
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
