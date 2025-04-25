import { get } from './client';

export async function getShortLink(path: string): Promise<{ albumId: ID }> {
  return get<any>(`${process.env.REACT_APP_API_URL}/shortlinks/${path}`)
    .then(response => response.data.shortLink);
}
