import { protectedGet } from './client';

export async function getCurrentUser(accessToken: string): Promise<any> {
  return protectedGet<any>(`${process.env.REACT_APP_API_URL}/me`, { headers: { accessToken } })
    .then((response) => {
      return response.data.user;
    });
}
