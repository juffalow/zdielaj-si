export class HTTPError extends Error {
  public message: string;
  public code: number;

  public request: {
    url: string;
    [x: string]: string | number | boolean;
  };

  public response: {
    status: number;
    body: string;
    [x: string]: string | number | boolean;
  };

  constructor(message: string, request: { url: string, [x: string]: string | number | boolean }, response: { status: number, body: string, [x: string]: string | number | boolean }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.request = request;
    this.response = response;
  }
}
