import { post, postMultipart, get } from './client';
import { setAlbumToken } from './token';

type Setting = {
  notification: string,
  isEnabled: boolean,
}

export async function register(email: string, password: string, meta: unknown): Promise<User> {
  return post(`${process.env.REACT_APP_USER_SERVICE_URL}/user/register`, { email, password, meta })
    .then(response => response.data.user);
}

export async function login(email: string, password: string): Promise<User> {
  return post(`${process.env.REACT_APP_USER_SERVICE_URL}/auth/login`, { email, password }, { credentials: 'include' })
    .then(response => response.data.user);
}

export async function refreshToken(): Promise<RefreshTokenResponse> {
  return get(`${process.env.REACT_APP_USER_SERVICE_URL}/auth/refresh-token`, { credentials: 'include' });
}

export async function logout(): Promise<unknown> {
  return get(`${process.env.REACT_APP_CORE_URL}/user/logout`, { credentials: 'include' });
}

export async function uploadPhoto(file: File): Promise<Media> {
  const formData = new FormData();

  formData.append('file', file);

  return postMultipart(`${process.env.REACT_APP_UPLOAD_URL}/upload/file`, formData)
    .then(res => {
      return res.data.file;
    });
}

export async function getAlbum(id: string): Promise<Album> {
  return get(`${process.env.REACT_APP_CORE_URL}/album/${id}`, { credentials: 'include' })
    .then(response => response.data.album);
}

export async function getAlbums(): Promise<Album[]> {
  return get(`${process.env.REACT_APP_CORE_URL}/album`, { credentials: 'include' })
    .then(response => response.data.albums);
}

export async function createAlbum(): Promise<Album> {
  return post(`${process.env.REACT_APP_CORE_URL}/album`, {})
    .then((response) => {
      setAlbumToken(response.data.user.token);
      return response.data.album;
    });
}

export async function addMedia(albumId: string, fileId: number): Promise<any> {
  return post(`${process.env.REACT_APP_CORE_URL}/album/${albumId}/media`, { fileId });
}

interface RefreshTokenResponse {
  error: unknown;
  data: {
    user: {      
      id: number;
      token: string;
    }
  };
}

export async function validateEmail(id: number, token: string): Promise<RefreshTokenResponse> {
  return get(`${process.env.REACT_APP_CORE_URL}/user/emailValidation?id=${id}&token=${token}`);
}

export async function getNotificationSettings(email: string): Promise<any> {
  return get(`${process.env.REACT_APP_CORE_URL}/notifications?email=${email}&type=email`)
    .then(response => response.data.settings);
}

export async function setNotificationSettings(email: string, settings: Setting[], token: string): Promise<any> {
  return post(`${process.env.REACT_APP_CORE_URL}/notifications?token=${token}`, {email, notifications: settings})
}
