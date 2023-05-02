
export {};

declare global {
  type User = {
    id: number;
    email: string;
    phone: string;
    isDeliverable: boolean;
    meta: unknown;
    createdAt: string;
    updatedAt: string;
  }

  type UserChannel = {
    id: number;
    userId: number;
    type: string;
    meta: unknown;
    isEnabled: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  type Setting = {
    id: number;
    userId: number;
    type: string;
    notification: string;
    isEnabled: boolean;
    createdAt: string;
    updatedAt: string;
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
