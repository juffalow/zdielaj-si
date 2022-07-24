export interface CreateParameters {
  path: string;
  mimetype: string;
  size: number;
}

export default interface MediaRepository {
  create(params: CreateParameters): Promise<Media>;

  get(id: string): Promise<Media | undefined>;
}
