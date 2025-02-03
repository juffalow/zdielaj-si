interface GetAlbumResponse {
  id: ID;
  user?: {
    id: ID;
  };
  name: string;
  description: string;
  media: {
    id: ID;
    location: string;
    mimetype: string;
    metadata: {
      width: number;
      height: number;
    };
  }[];
  shortLink: {
    path: string;
  };
}

interface AlbumsController {
  getAlbum(id: ID): Promise<GetAlbumResponse>;
}
