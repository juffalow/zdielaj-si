declare namespace Utils {
  interface HTTPClient {
    get(url: string, params?: unknown, options?: unknown): Promise<unknown>;

    post(endpoint: string, data: unknown, options?: unknown): Promise<unknown>;
  }
}
