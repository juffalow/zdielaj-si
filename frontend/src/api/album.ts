import { post, retriableGet, patch, httpDelete } from './client';
import retryPromise from '../utils/retryPromise';
import useAuth from '../utils/useAuth';

export async function createAlbum(files: Array<{ name: string, mimetype: string, size: number }>): Promise<any> {
  return post<API.Album.CreateAlbumRequest>(`${process.env.REACT_APP_API_URL}/albums`, { files })
    .then((response) => {
      return response.data.album;
    });
}

export async function createUserAlbum(files: Array<{ name: string, mimetype: string, size: number }>): Promise<any> {
  return post<API.Album.CreateAlbumRequest>(`${process.env.REACT_APP_API_URL}/me/albums`, { files })
    .then((response) => {
      return response.data.album;
    });
}

export async function getAlbum(id: string): Promise<any> {
  const { refreshSession } = useAuth();

  return retryPromise(() => retriableGet<any>(`${process.env.REACT_APP_API_URL}/albums/${id}`), { retries: 3, onUnauthorized: refreshSession })
    .then((response) => {
      return response.data.album;
    });
}

export async function getCurrentUserAlbums(first = 10, after = 0): Promise<Album[]> {
  const { user, refreshSession } = useAuth();
  const headers = new Headers();

  if (typeof user !== 'undefined' && user !== null) {
    headers.set('Authorization',  `Bearer ${user.idToken}`);
  }

  return retryPromise(() => retriableGet<any>(`${process.env.REACT_APP_API_URL}/me/albums?first=${first}&after=${after}`, { headers }), { retries: 3, onUnauthorized: refreshSession })
    .then((response) => {
      return response.data.albums;
    });
}

export async function updateAlbum(id: ID, params: { name?: string, description?: string }): Promise<Album> {
  return patch<any>(`${process.env.REACT_APP_API_URL}/albums/${id}`, params)
    .then(response => response.data.album);
}

export async function deleteAlbum(id: ID): Promise<Album> {
  return httpDelete(`${process.env.REACT_APP_API_URL}/albums/${id}`)
    .then(response => response.data.album);
}
