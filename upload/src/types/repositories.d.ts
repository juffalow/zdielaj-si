declare namespace MediaRepository {
  interface CreateParameters {
    path: string;
    mimetype: string;
    height: number | undefined;
    width: number | undefined;
    size: number;
  }
}

interface MediaRepository {
  create(params: MediaRepository.CreateParameters): Promise<Media>;

  get(id: string): Promise<Media | undefined>;
}

declare namespace ThumbnailRepository {
  interface CreateParameters {
    mediaId: string;
    path: string;
    mimetype: string;
    height: number | undefined;
    width: number | undefined;
    size: number;
  }
}

interface ThumbnailRepository {
  create(params: ThumbnailRepository.CreateParameters): Promise<Media>;

  get(id: string): Promise<Media | undefined>;

  getAll(mediaId: string): Promise<Thumbnail[] | undefined>;
}

declare namespace MediaConvertJobRepository {
  interface CreateParameters {
    id: string;
    mediaId: string;
  }
}

interface MediaConvertJobRepository {
  create(params: MediaConvertJobRepository.CreateParameters): Promise<{ id: string, mediaId: string }>;

  get(mediaId: string): Promise<{ id: string, mediaId: string } | undefined>;
}
