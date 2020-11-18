interface BaseErrorConstructor {
  message: string;
  code: number;
}

export default class BaseError extends Error {
  public message: string;
  public code: number;

  constructor({ message, code }: BaseErrorConstructor) {
    super();
    this.message = message;
    this.code = code;
  }
}
