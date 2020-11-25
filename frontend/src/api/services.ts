import { post, postMultipart } from './client';
import config from '../config';

export async function register(name: string, email: string, password: string): Promise<any> {
  return post(`${config.url}/user/register`, { name, email, password });
}

export async function login(email: string, password: string): Promise<any> {
  return post(`${config.url}/user/login`, { email, password });
}

export async function uploadPhotos(files: FileList | Array<File>): Promise<Album> {
  const formData = new FormData();
  Array.from(files).forEach((file: File) => {
    formData.append(`images`, file);
  });

  return postMultipart(`${config.url}/upload`, formData)
    .then(res => {
      localStorage.setItem('albumToken', res.data.user.token);

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
