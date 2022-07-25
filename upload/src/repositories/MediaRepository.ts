export interface CreateParameters {
  path: string;
  mimetype: string;
  height: number | undefined;
  width: number | undefined;
  size: number;
}

export default interface MediaRepository {
  create(params: CreateParameters): Promise<Media>;

  get(id: string): Promise<Media | undefined>;
}
