import { retriableGet } from './client';
import retryPromise from '../utils/retryPromise';
import useAuth from '../utils/useAuth';

export async function getCurrentUser(accessToken: string): Promise<any> {
  const { user, refreshSession } = useAuth();
  const headers = new Headers();

  if (typeof user !== 'undefined' && user !== null) {
    headers.set('Authorization',  `Bearer ${user.idToken}`);
    headers.set('accessToken',  accessToken);
  }

  return retryPromise(() => retriableGet<any>(`${process.env.REACT_APP_API_URL}/me`, { headers }), { retries: 3, onUnauthorized: refreshSession })
    .then((response) => {
      return response.data.user;
    });
}
