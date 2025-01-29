export class APIError extends Error {
  public message: string;
  public code: number;
  public response: {
    url: string;
    status: number;
    headers: Record<string, string | null>;
    [key: string]: string | number | boolean | null | Record<string, string | null>;
  };

  constructor(message: string, code: number, response: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
    this.response =response;
    
    Error.captureStackTrace(this, this.constructor);
  }
}
