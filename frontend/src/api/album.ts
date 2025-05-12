import { post, protectedPost, get, protectedGet, protectedPatch, protectedDelete } from './client';

export async function createAlbum(files: Array<{ name: string, mimetype: string, size: number }>): Promise<any> {
  return post<API.Album.CreateAlbumRequest>(`${process.env.REACT_APP_API_URL}/albums`, { files })
    .then((response) => {
      return response.data.album;
    });
}

export async function createUserAlbum(files: Array<{ name: string, mimetype: string, size: number }>): Promise<any> {
  return protectedPost<API.Album.CreateAlbumRequest>(`${process.env.REACT_APP_API_URL}/me/albums`, { files })
    .then((response) => {
      return response.data.album;
    });
}

export async function getAlbum(id: string): Promise<any> {
  return get<any>(`${process.env.REACT_APP_API_URL}/albums/${id}`)
    .then((response) => {
      return response.data.album;
    });
}

export async function getCurrentUserAlbums(first = 10, after = 0): Promise<Album[]> {
  return protectedGet<any>(`${process.env.REACT_APP_API_URL}/me/albums?first=${first}&after=${after}`)
    .then((response) => {
      return response.data.albums;
    });
}

export async function updateAlbum(id: ID, params: { name?: string, description?: string }): Promise<Album> {
  return protectedPatch<any>(`${process.env.REACT_APP_API_URL}/albums/${id}`, params)
    .then(response => response.data.album);
}

export async function deleteAlbum(id: ID): Promise<Album> {
  return protectedDelete(`${process.env.REACT_APP_API_URL}/albums/${id}`)
    .then(response => response.data.album);
}
