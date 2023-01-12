interface APIErrorConstructor {
  message: string;
  code: number;
}

export default class APIError extends Error {
  public message: string;
  public code: number;

  constructor({ message, code }: APIErrorConstructor) {
    super();
    this.message = message;
    this.code = code;
  }
}
