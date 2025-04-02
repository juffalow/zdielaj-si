import { post, postMultipart, put, get, httpDelete } from './client';
import { setAlbumToken } from './token';

type Setting = {
  notification: string,
  isEnabled: boolean,
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

export async function getUserAlbums(user: User, first = 10, after = 0): Promise<Album[]> {
  return get<API.GetUserAlbumsResponse>(`${process.env.REACT_APP_CORE_URL}/me/albums?first=${first}&after=${after}`)
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
  
  return get<API.GetPublicProfileAlbumsResponse>(`${process.env.REACT_APP_CORE_URL}/publicprofiles/${publicProfileId}/albums?${searchParams}`)
    .then(response => response.data.albums);
}

export async function addAlbumToPublicProfile(publicProfileId: ID, albumId: ID): Promise<unknown> {
  return post(`${process.env.REACT_APP_CORE_URL}/publicprofiles/${publicProfileId}/albums`, { id: albumId });
}

export async function removeAlbumFromPublicProfile(publicProfileId: ID, albumId: ID): Promise<unknown> {
  return httpDelete(`${process.env.REACT_APP_CORE_URL}/publicprofiles/${publicProfileId}/albums/${albumId}`);
}
