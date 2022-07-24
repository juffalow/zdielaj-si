export interface CreateParameters {
  email: string;
  subject: string;
  body: string;
  meta: unknown;
}

export interface FindParameters {
  email?: string;
  subject?: string;
}

export interface CountParameters {
  email?: string;
  subject?: string;
}

export default interface EmailLogRepository {
  get(id: string): Promise<EmailLog>;

  create(params: CreateParameters): Promise<EmailLog>;

  find(params: FindParameters): Promise<EmailLog[]>;

  count(params: CountParameters): Promise<number>;
}
