import { get } from './client';
import config from '../config';
import namespace from '../services/cls';

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
  const traceId = namespace.get('traceId');
  const searchParameters = new URLSearchParams();

  if (typeof traceId !== 'undefined') {
    searchParameters.append('traceId', traceId);
  }
  
  return get(`${config.services.upload.url}/media/${id}?${searchParameters}`);
}
