interface APIErrorConstructor {
  message: string;
  code: number;
  http: {
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
   * HTTP status code
   */
  public http: { status: number };

  constructor({ message, code, http }: APIErrorConstructor) {
    super();
    this.message = message;
    this.code = code;
    this.http = http;
  }
}
