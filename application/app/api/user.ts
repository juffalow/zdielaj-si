import { protectedGet } from './client';

export async function getCurrentUser(accessToken: string): Promise<any> {
  return protectedGet<any>(`${import.meta.env.VITE_API_URL}/me`, { headers: { accessToken } })
    .then((response) => {
      return response.data.user;
    });
}
