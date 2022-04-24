import { post, postMultipart, get } from './client';
import { setAlbumToken } from './token';
import config from '../config';

export async function register(name: string, email: string, password: string): Promise<any> {
  return post(`${config.url}/user/register`, { name, email, password });
}

export async function login(email: string, password: string): Promise<any> {
  return post(`${config.url}/user/login`, { email, password }, { credentials: 'include' });
}

export async function logout(): Promise<RefreshTokenResponse> {
  return get(`${config.url}/user/logout`, { credentials: 'include' });
}

export async function uploadPhotos(files: FileList | File[]): Promise<Album> {
  const formData = new FormData();
  Array.from(files).forEach((file: File) => {
    formData.append(`images`, file);
  });

  return postMultipart(`${config.url}/upload`, formData)
    .then(res => {
      setAlbumToken(res.data.user.token);

      return res.data.album;
    });
}

export async function uploadPhoto(albumId: string, file: File): Promise<Album> {
  const formData = new FormData();

  formData.append('image', file);

  return postMultipart(`${config.url}/upload/${albumId}`, formData)
    .then(res => {
      return res.data.album;
    });
}

interface RefreshTokenResponse {
  error: unknown;
  data: {
    id: string;
    expiresAt: string;
    token: string;
  };
}

export async function refreshToken(): Promise<RefreshTokenResponse> {
  return get(`${config.url}/user/refreshToken/`, { credentials: 'include' });
}

export async function validateEmail(id: number, token: string): Promise<RefreshTokenResponse> {
  return get(`${config.url}/user/emailValidation?id=${id}&token=${token}`);
}
