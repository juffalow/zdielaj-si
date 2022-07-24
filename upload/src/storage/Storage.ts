import { Readable } from 'stream';

export default interface Storage {
  store(body: Readable, path: string): Promise<void>;

  getUrl(path: string): string;
}
