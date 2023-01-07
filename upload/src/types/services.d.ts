declare namespace Services {
  interface Storage {
    store(body: unknown, path: string): Promise<void>;

    getUrl(path: string): Promise<string>;
  }

  interface Queue {
    sendMessage(message: unknown): Promise<unknown>;
  }
}
