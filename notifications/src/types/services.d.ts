declare namespace Services {
  interface Queue {
    sendMessage(message: unknown): Promise<unknown>;
  }

  interface Email {
    sendMail(email: string, subject: string, body: string, from: string, unsubscribeUrl?: string): Promise<void>;
  }
}
