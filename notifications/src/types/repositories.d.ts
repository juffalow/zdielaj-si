declare namespace EmailNotificationRepository {
  interface CreateParameters {
    email: string;
    notification: string;
    isEnabled: boolean;
  }
  
  interface FindParameters {
    email?: string;
    notification?: string;
  }
}

interface EmailNotificationRepository {
  get(email: string, event: string): Promise<EmailNotification>;

  create(params: EmailNotificationRepository.CreateParameters): Promise<EmailNotification>;

  find(params: EmailNotificationRepository.FindParameters): Promise<EmailNotification[]>;
}

declare namespace ThumbnailRepository {
  interface CreateParameters {
    mediaId: string;
    path: string;
    mimetype: string;
    height: number | undefined;
    width: number | undefined;
    size: number;
  }
}

declare namespace EmailLogRepository {
  interface CreateParameters {
    email: string;
    subject: string;
    body: string;
    meta: unknown;
  }
  
  interface FindParameters {
    email?: string;
    subject?: string;
  }
  
  interface CountParameters {
    email?: string;
    subject?: string;
  }
}

interface EmailLogRepository {
  get(id: string): Promise<EmailLog>;

  create(params: EmailLogRepository.CreateParameters): Promise<EmailLog>;

  find(params: EmailLogRepository.FindParameters): Promise<EmailLog[]>;

  count(params: EmailLogRepository.CountParameters): Promise<number>;
}
