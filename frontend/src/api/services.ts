import { post, postMultipart, put, get, httpDelete } from './client';
import { setAlbumToken } from './token';

type Setting = {
  notification: string,
  isEnabled: boolean,
}

export async function register(username: string, password: string, meta: unknown): Promise<User> {
  return post(`${process.env.REACT_APP_USER_SERVICE_URL}/user/register`, { username, password, meta })
    .then(response => response.data.user);
}

export async function confirmRegister(username: string, code: string): Promise<any> {
  return post(`${process.env.REACT_APP_USER_SERVICE_URL}/user/confirm`, { username, code });
}

export async function login(username: string, password: string): Promise<User> {
  return post(`${process.env.REACT_APP_USER_SERVICE_URL}/user/login`, { username, password }, { credentials: 'include' })
    .then(response => response.data.user);
}

export async function requestPasswordReset(username: string): Promise<unknown> {
  return post(`${process.env.REACT_APP_USER_SERVICE_URL}/user/password-reset-request`, { username })
    .then(response => response.data);
}

export async function resetPassword(username: string, password: string, code: string): Promise<unknown> {
  return post(`${process.env.REACT_APP_USER_SERVICE_URL}/user/password-reset`, { username, password, code })
    .then(response => response.data);
}

export async function refreshToken(): Promise<API.GetRefreshTokenResponse> {
  return get(`${process.env.REACT_APP_USER_SERVICE_URL}/user/refresh-token`, { credentials: 'include' });
}

export async function logout(): Promise<unknown> {
  return post(`${process.env.REACT_APP_USER_SERVICE_URL}/user/logout`, {}, { credentials: 'include' });
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
  return get<API.GetAlbumResponse>(`${process.env.REACT_APP_CORE_URL}/albums/${id}`, { credentials: 'include' })
    .then(response => response.data.album);
}

export async function getCurrentUser(): Promise<User> {
  return get<API.GetCurrentUserResponse>(`${process.env.REACT_APP_CORE_URL}/me`, { credentials: 'include' })
    .then(response => response.data.user);
}

export async function getUserAlbums(user: User): Promise<Album[]> {
  return get<API.GetUserAlbumsResponse>(`${process.env.REACT_APP_CORE_URL}/users/${user.id}/albums`)
    .then(response => response.data.albums);
}

export async function deleteAlbum(id: ID): Promise<Album> {
  return httpDelete(`${process.env.REACT_APP_CORE_URL}/albums/${id}`, { credentials: 'include' })
    .then(response => response.data.album);
}


export async function createAlbum(): Promise<Album> {
  return post(`${process.env.REACT_APP_CORE_URL}/albums`, {})
    .then((response) => {
      setAlbumToken(response.data.user.token);
      return response.data.album;
    });
}

export async function updateAlbum(id: ID, params: { name?: string, description?: string }): Promise<Album> {
  return put(`${process.env.REACT_APP_CORE_URL}/albums/${id}`, params)
    .then(response => response.data.album);
}

export async function addMedia(albumId: string, fileId: number): Promise<any> {
  return post(`${process.env.REACT_APP_CORE_URL}/albums/${albumId}/media`, { fileId });
}

export async function createShortLink(album: Album): Promise<{ path: string; albumId: ID }> {
  return post(`${process.env.REACT_APP_CORE_URL}/shortlinks`, { albumId: album.id })
    .then(response => response.data.shortLink);
}

export async function getShortLink(path: string): Promise<{ albumId: ID }> {
  return get<any>(`${process.env.REACT_APP_CORE_URL}/shortlinks/${path}`)
    .then(response => response.data.shortLink);
}

export async function getNotificationSettings(email: string): Promise<any> {
  return get<any>(`${process.env.REACT_APP_CORE_URL}/notifications?email=${email}&type=email`)
    .then(response => response.data.settings);
}

export async function setNotificationSettings(email: string, settings: Setting[], token: string): Promise<any> {
  return post(`${process.env.REACT_APP_CORE_URL}/notifications?token=${token}`, {email, notifications: settings})
}

export async function createPublicProfile(id: string, name: string, description: string): Promise<any> {
  return post(`${process.env.REACT_APP_CORE_URL}/publicprofiles/`, { id, name, description })
    .then(response => response.data.publicProfile);
}

export async function updatePublicProfile(id: ID, params: { name?: string, description?: string }): Promise<any> {
  return put(`${process.env.REACT_APP_CORE_URL}/publicprofiles/${id}`, params)
    .then(response => response.data.publicProfile);
}

export async function getPublicProfile(id: ID): Promise<PublicProfile> {
  return get<API.GetPublicProfileResponse>(`${process.env.REACT_APP_CORE_URL}/publicprofiles/${id}`)
    .then(response => response.data.publicProfile);
}

export async function getPublicProfileAlbums(params: { publicProfileId: ID, first?: number, after?: number }): Promise<any> {
  const searchParams = new URLSearchParams();
  const { publicProfileId, ...rest } = params as any;

  for (const key in rest) {
    searchParams.append(key, rest[key]);
  }
  
  return get(`${process.env.REACT_APP_CORE_URL}/publicprofiles/${publicProfileId}/albums?${searchParams}`);
}

export async function addAlbumToPublicProfile(publicProfileId: ID, albumId: ID): Promise<unknown> {
  return post(`${process.env.REACT_APP_CORE_URL}/publicprofiles/${publicProfileId}/albums`, { id: albumId });
}

export async function removeAlbumFromPublicProfile(publicProfileId: ID, albumId: ID): Promise<unknown> {
  return httpDelete(`${process.env.REACT_APP_CORE_URL}/publicprofiles/${publicProfileId}/albums/${albumId}`);
}
