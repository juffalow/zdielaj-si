import { post, postMultipart, get, } from './client';

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

export async function addMedia(albumId: string, fileId: number): Promise<any> {
  return post(`${process.env.REACT_APP_CORE_URL}/albums/${albumId}/media`, { fileId });
}

export async function getNotificationSettings(email: string): Promise<any> {
  return get<any>(`${process.env.REACT_APP_CORE_URL}/notifications?email=${email}&type=email`)
    .then(response => response.data.settings);
}

export async function setNotificationSettings(email: string, settings: Setting[], token: string): Promise<any> {
  return post(`${process.env.REACT_APP_CORE_URL}/notifications?token=${token}`, {email, notifications: settings})
}
