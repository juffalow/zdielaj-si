declare namespace EmailNotificationRepository {
  interface CreateParameters {
    email: string;
    notification: string;
    isEnabled: boolean;
    meta?: unknown | null;
  }

  interface UpdateParameters {
    email: string;
    notification: string;
    isEnabled: boolean;
    meta?: unknown | null;
  }
  
  interface FindParameters {
    email?: string;
    notification?: string;
  }
}

interface EmailNotificationRepository {
  get(email: string, event: string): Promise<EmailNotification>;

  create(params: EmailNotificationRepository.CreateParameters): Promise<EmailNotification>;

  update(params: EmailNotificationRepository.UpdateParameters): Promise<EmailNotification>;

  find(params: EmailNotificationRepository.FindParameters): Promise<EmailNotification[]>;
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
    createdAt? : string | {
      from?: string;
      to?: string;
    };
  }
  
  interface CountParameters {
    email?: string;
    subject?: string;
    createdAt? : string | {
      from?: string;
      to?: string;
    };
  }
}

interface EmailLogRepository {
  get(id: string): Promise<EmailLog>;

  create(params: EmailLogRepository.CreateParameters): Promise<EmailLog>;

  find(params: EmailLogRepository.FindParameters): Promise<EmailLog[]>;

  count(params: EmailLogRepository.CountParameters): Promise<number>;
}
