import { post, postMultipart, get } from './client';
import { setAlbumToken } from './token';

export async function register(name: string, email: string, password: string): Promise<any> {
  return post(`${process.env.REACT_APP_CORE_URL}/user/register`, { name, email, password });
}

export async function login(email: string, password: string): Promise<any> {
  return post(`${process.env.REACT_APP_CORE_URL}/user/login`, { email, password }, { credentials: 'include' });
}

export async function logout(): Promise<RefreshTokenResponse> {
  return get(`${process.env.REACT_APP_CORE_URL}/user/logout`, { credentials: 'include' });
}

export async function uploadPhoto(file: File): Promise<Media> {
  const formData = new FormData();

  formData.append('image', file);

  return postMultipart(`${process.env.REACT_APP_UPLOAD_URL}/upload`, formData)
    .then(res => {
      return res.data.media;
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

export async function refreshToken(): Promise<RefreshTokenResponse> {
  return get(`${process.env.REACT_APP_CORE_URL}/user/refreshToken/`, { credentials: 'include' });
}

export async function validateEmail(id: number, token: string): Promise<RefreshTokenResponse> {
  return get(`${process.env.REACT_APP_CORE_URL}/user/emailValidation?id=${id}&token=${token}`);
}
