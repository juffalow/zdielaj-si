type File = {
  id: string;
  userId: number | null;
  path: string;
  mimetype: string;
  size: number;
  metadata: unknown;
}

type Thumbnail = {
  id: string;
  fileId: string;
  path: string;
  mimetype: string;
  size: number;
}
