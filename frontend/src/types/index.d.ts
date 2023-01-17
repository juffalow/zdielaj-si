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
  userId: number;
  media: Media[];
  createdAt: string;
}

type User = {
  id?: number;
  name?: string;
  token: string;
}