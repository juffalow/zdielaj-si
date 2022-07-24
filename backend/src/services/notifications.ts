import { post } from './client';
import config from '../config';

export async function notify(data: unknown): Promise<any> {
  return post(`${config.services.notifications.url}/notify`, data);
}
