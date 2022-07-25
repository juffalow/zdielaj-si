export interface CreateParameters {
  mediaId: string;
  path: string;
  mimetype: string;
  height: number | undefined;
  width: number | undefined;
  size: number;
}

export default interface ThumbnailRepository {
  create(params: CreateParameters): Promise<Media>;

  get(id: string): Promise<Media | undefined>;
}
