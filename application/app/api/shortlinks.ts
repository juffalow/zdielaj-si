import { get } from './client';

export async function getShortLink(path: string): Promise<{ album: { id: ID } }> {
  return get<API.ShortLinks.GetShortLinkResponse>(`${import.meta.env.VITE_API_URL}/shortlinks/${path}`).then(
    (response) => {
      return response.data.shortLink;
    }
  );
}
