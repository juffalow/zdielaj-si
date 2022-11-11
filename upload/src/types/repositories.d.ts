declare namespace MediaRepository {
  interface CreateParameters {
    userId?: number;
    path: string;
    mimetype: string;
    size: number;
    metadata?: unknown;
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
    size: number;
    metadata?: unknown;
  }
}

interface ThumbnailRepository {
  create(params: ThumbnailRepository.CreateParameters): Promise<Thumbnail>;

  get(id: string): Promise<Thumbnail | undefined>;

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
