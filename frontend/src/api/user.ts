import { get } from './client';

export async function getCurrentUser(accessToken: string): Promise<any> {
  return get<any>(`${process.env.REACT_APP_API_URL}/me`, { headers: { accessToken } })
    .then((response) => {
      console.log('API.user.getCurrentUser', response);
      return response.data.user;
    });
}
