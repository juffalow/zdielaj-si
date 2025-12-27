import { getUserAccessToken } from './auth';
import { protectedGet } from './client';

export async function getCurrentUser(): Promise<any> {
  const accessToken = await getUserAccessToken();

  if (accessToken === null) {
    throw new Error('User is not authenticated!');
  }

  return protectedGet<any>(`${import.meta.env.VITE_API_URL}/me`, { headers: { accessToken } }).then((response) => {
    return response.data.user;
  });
}
