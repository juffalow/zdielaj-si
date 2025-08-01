import {
  get,
  post,
  protectedDelete,
  protectedGet,
  protectedPatch,
  protectedPost,
} from './client';

export async function createAlbum(files: Array<{ name: string, mimetype: string, size: number }>): Promise<Album> {
  return post<API.Album.CreateAlbumRequest>(`${import.meta.env.VITE_API_URL}/albums`, { files })
    .then((response) => {
      return response.data.album as Album;
    });
}

export async function createUserAlbum(files: Array<{ name: string, mimetype: string, size: number }>): Promise<Album> {
  return protectedPost<API.Album.CreateAlbumRequest>(`${import.meta.env.VITE_API_URL}/me/albums`, { files })
    .then((response) => {
      return response.data.album as Album;
    });
}

export async function getAlbum(id: string): Promise<Album> {
  return get<any>(`${import.meta.env.VITE_API_URL}/albums/${id}`)
    .then((response) => {
      return response.data.album as Album;
    });
}

export async function getCurrentUserAlbums(first = 10, after = 0): Promise<Album[]> {
  return protectedGet<any>(`${import.meta.env.VITE_API_URL}/me/albums?first=${first}&after=${after}`)
    .then((response) => {
      return response.data.albums as Album[];
    });
}

export async function updateAlbum(id: ID, params: { name?: string, description?: string, layout?: 'cols' | 'rows' | 'tiles', gaps?: 'none' | 'small' | 'medium' | 'large', retention?: '1' | '7' | '31' | '366' | '0', changeLayout?: boolean }): Promise<Album> {
  return protectedPatch<any>(`${import.meta.env.VITE_API_URL}/albums/${id}`, params)
    .then(response => response.data.album);
}

export async function deleteAlbum(id: ID): Promise<Album> {
  return protectedDelete(`${import.meta.env.VITE_API_URL}/albums/${id}`)
    .then(response => response.data.album);
}
