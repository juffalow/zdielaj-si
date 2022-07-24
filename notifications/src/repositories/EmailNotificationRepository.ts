export interface CreateParameters {
  email: string;
  event: string;
  isEnabled: boolean;
}

export interface FindParameters {
  email?: string;
  event?: string;
}

export default interface EmailNotificationRepository {
  get(email: string, event: string): Promise<EmailNotification>;

  create(params: CreateParameters): Promise<EmailNotification>;

  find(params: FindParameters): Promise<EmailNotification[]>;
}
