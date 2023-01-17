import { post, postMultipart, get } from './client';
import { setAlbumToken } from './token';

type Setting = {
  notification: string,
  isEnabled: boolean,
}

export async function register(name: string, email: string, password: string): Promise<User> {
  return post(`${process.env.REACT_APP_CORE_URL}/user/register`, { name, email, password })
    .then(response => response.data.user);
}

export async function login(email: string, password: string): Promise<User> {
  return post(`${process.env.REACT_APP_CORE_URL}/user/login`, { email, password }, { credentials: 'include' })
    .then(response => response.data.user);
}

export async function logout(): Promise<unknown> {
  return get(`${process.env.REACT_APP_CORE_URL}/user/logout`, { credentials: 'include' });
}

export async function uploadPhoto(file: File): Promise<Media> {
  const formData = new FormData();

  formData.append('image', file);

  return postMultipart(`${process.env.REACT_APP_UPLOAD_URL}/upload/files`, formData)
    .then(res => {
      return res.data.file;
    });
}

export async function getAlbum(id: string): Promise<Album> {
  return get(`${process.env.REACT_APP_CORE_URL}/albums/${id}`, { credentials: 'include' })
    .then(response => response.data.album);
}

export async function getAlbums(): Promise<Album[]> {
  return get(`${process.env.REACT_APP_CORE_URL}/albums`, { credentials: 'include' })
    .then(response => response.data.albums);
}

export async function createAlbum(): Promise<Album> {
  return post(`${process.env.REACT_APP_CORE_URL}/album`, {})
    .then((response) => {
      setAlbumToken(response.data.user.token);
      return response.data.album;
    });
}

export async function addMedia(albumId: string, mediaId: number): Promise<any> {
  return post(`${process.env.REACT_APP_CORE_URL}/album/${albumId}/media`, { mediaId });
}

interface RefreshTokenResponse {
  error: unknown;
  data: {
    id: number;
    expiresAt: string;
    token: string;
  };
}

export async function refreshToken(): Promise<RefreshTokenResponse> {
  return get(`${process.env.REACT_APP_CORE_URL}/user/refreshToken/`, { credentials: 'include' });
}

export async function validateEmail(id: number, token: string): Promise<RefreshTokenResponse> {
  return get(`${process.env.REACT_APP_CORE_URL}/user/emailValidation?id=${id}&token=${token}`);
}

export async function setNotificationSettings(email: string, settings: Setting[], token: string): Promise<any> {
  return post(`${process.env.REACT_APP_CORE_URL}/notifications?token=${token}`, {email, notifications: settings})
}
