export interface CreateParameters {
  id: string;
  mediaId: string;
}

export default interface MediaRepository {
  create(params: CreateParameters): Promise<{ id: string, mediaId: string }>;

  get(mediaId: string): Promise<{ id: string, mediaId: string } | undefined>;
}
