interface Media {
  id: number;
  albumId: string;
  fileId: number;
}

interface Album {
  id: string;
  userId?: number;
  hash: string;
  media?: Media[];
  createdAt?: string;
}

type User = {
  id: number;
}
