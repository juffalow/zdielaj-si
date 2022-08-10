
export {};

declare global {
  type User = {
    id: string;
    firstName: string;
    email: string;
    token: string;
  }
  
  type EmailNotification = {
    id: string;
    email: string;
    event: string;
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

  type Template = {
    render: (parameters: unknown) => string;
  }
}
