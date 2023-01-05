import { post, get } from './client';
import config from '../config';

type Setting = [
  notification: string,
  isEnabled: boolean,
]

export async function notify(data: unknown): Promise<any> {
  return post(`${config.services.notifications.url}/notifications`, data);
}

export function getNotificationSettings(email: string, token: string): Promise<any> {
  return get(`${config.services.notifications.url}/email?email=${email}`, {
    headers: {
      'Authorization': token,
    },
  });
}

export function setNotificationSettings(params: { email: string, notifications: Setting[] }, token: string): Promise<any> {
  return post(`${config.services.notifications.url}/email`, {
    headers: {
      Authorization: token,
    },
    email: params.email,
    notifications: params.notifications,
  })
}
