import { get } from './client';
import config from '../config';

interface GetMediaResponse {
  error: unknown,
  data: {
    media: {
      id: number,
      mimetype: string,
      size: number,
      location: string,
      thumbnails?: {
        mediaId: number,
        mimetype: string,
        size: number,
        location: string,
      }
    },
  },
}

export async function getMedia(id: number): Promise<GetMediaResponse> {
  return get(`${config.services.upload.url}/media/${id}`);
}
