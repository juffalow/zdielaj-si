interface BaseErrorConstructor {
  message: string;
  code: number;
}

export class BaseError extends Error {
  public message: string;
  public code: number;

  constructor({ message, code }: BaseErrorConstructor) {
    super();
    this.message = message;
    this.code = code;
  }
}

interface HTTPErrorConstructor extends BaseErrorConstructor {
  request: {
    url: string;
  };

  response: {
    status: number;
    body: string;
  };
}

export class HTTPError extends Error {
  public message: string;
  public code: number;

  public request: {
    url: string;
  };

  public response: {
    status: number;
    body: string;
  };

  constructor({ message, code, request, response }: HTTPErrorConstructor) {
    super();
    this.message = message;
    this.code = code;
    this.request = request;
    this.response = response;
  }
}