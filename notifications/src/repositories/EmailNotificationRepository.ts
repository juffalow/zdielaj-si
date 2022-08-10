export interface CreateParameters {
  email: string;
  notification: string;
  isEnabled: boolean;
}

export interface FindParameters {
  email?: string;
  notification?: string;
}

export default interface EmailNotificationRepository {
  get(email: string, event: string): Promise<EmailNotification>;

  create(params: CreateParameters): Promise<EmailNotification>;

  find(params: FindParameters): Promise<EmailNotification[]>;
}
