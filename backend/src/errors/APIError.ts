interface APIErrorConstructor {
  message: string;
  code: number;
  response: {
    status: number;
  };
}

/**
 * This error is handled in errorHandler middleware.
 */
export default class APIError extends Error {
  /**
   * Response error message
   */
  public message: string;
  /**
   * Response error code
   */
  public code: number;
  /**
   * 
   */
  public response: {
    status: number;
  };

  constructor({ message, code, response }: APIErrorConstructor) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
    this.response = response;
  }
}

export class BadRequestError extends APIError {
  constructor(message: string, code: number) {
    super({
      message,
      code,
      response: {
        status: 400,
      },
    });
  }
}

export class UnauthorizedError extends APIError {
  constructor(message: string, code: number) {
    super({
      message,
      code,
      response: {
        status: 401,
      },
    });
  }
}

export class ForbiddenError extends APIError {
  constructor(message: string, code: number) {
    super({
      message,
      code,
      response: {
        status: 403,
      },
    });
  }
}

export class NotFoundError extends APIError {
  constructor(message: string, code: number) {
    super({
      message,
      code,
      response: {
        status: 404,
      },
    });
  }
}
