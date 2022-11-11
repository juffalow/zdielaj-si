type Media = {
  id: string;
  userId: number | null;
  path: string;
  mimetype: string;
  size: number;
  metadata: unknown;
}

type Thumbnail = {
  id: string;
  mediaId: string;
  path: string;
  mimetype: string;
  size: number;
}
