import { retriableGet } from './client';
import retryPromise from '../utils/retryPromise';

export async function getShortLink(path: string): Promise<{ albumId: ID }> {
  return retryPromise(() => retriableGet<any>(`${process.env.REACT_APP_API_URL}/shortlinks/${path}`), { retries: 8, attempt: 0 })
    .then((response) => {
      return response.data.album;
    });
}
