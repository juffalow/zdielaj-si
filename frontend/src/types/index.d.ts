type ID = string | number;

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
  compressedId: string;
  user: {
    id: ID;
  };
  media: Media[];
  createdAt: string;
}

type User = {
  id?: ID;
  username?: string;
  accessToken: string;
  meta?: Record<string, string | number | boolean>;
}

type PublicProfile = {
  id: ID;
  userId: ID;
  name: string;
  slug: string;
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

namespace JSX {
  interface IntrinsicElements {
    'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
