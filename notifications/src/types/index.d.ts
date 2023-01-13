
export {};

declare global {
  type User = {
    id: number;
    email: string;
    isDeliverable: boolean;
    meta: unknown;
    createdAt: string;
    updatedAt: string;
  }
  
  type UserNotificationSetting = {
    id: number;
    userId: number;
    type: string;
    notification: string;
    isEnabled: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  type EmailLog = {
    id: string;
    email: string;
    subject: string;
    body: string;
    meta: unknown;
    createdAt: string;
  }

  type UserNotification = {
    id: string;
    userId: string;
    type: string;
    subject: string;
    body: string;
    meta: unknown;
    status: string;
    createdAt: string;
  }

  type Template = {
    render: (parameters: unknown) => string;
  }
}
