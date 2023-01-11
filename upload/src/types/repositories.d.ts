declare namespace FileRepository {
  interface CreateParameters {
    userId?: number;
    path: string;
    mimetype: string;
    size: number;
    metadata?: unknown;
  }
}

interface FileRepository {
  create(params: FileRepository.CreateParameters): Promise<File>;

  get(id: string): Promise<File | undefined>;
}

declare namespace ThumbnailRepository {
  interface CreateParameters {
    fileId: string;
    path: string;
    mimetype: string;
    size: number;
    metadata?: unknown;
  }
}

interface ThumbnailRepository {
  create(params: ThumbnailRepository.CreateParameters): Promise<Thumbnail>;

  get(id: string): Promise<Thumbnail | undefined>;

  getAll(fileId: string): Promise<Thumbnail[] | undefined>;
}

declare namespace MediaConvertJobRepository {
  interface CreateParameters {
    id: string;
    fileId: string;
  }
}

interface MediaConvertJobRepository {
  create(params: MediaConvertJobRepository.CreateParameters): Promise<{ id: string, fileId: string }>;

  get(fileId: string): Promise<{ id: string, fileId: string } | undefined>;
}
