import { post, get } from './client';
import config from '../config';

export async function notify(data: unknown): Promise<any> {
  return post(`${config.services.notifications.url}/notifications`, data);
}

export function getNotifications(email: string, token: string): Promise<any> {
  return get(`${config.services.notifications.url}/email?email=${email}`, {
    headers: {
      'Authorization': token,
    },
  });
}
