interface APIErrorConstructor {
  message: string;
  code: number;
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
   * HTTP status code
   */
  public code: number;

  constructor({ message, code }: APIErrorConstructor) {
    super();
    this.message = message;
    this.code = code;
  }
}
