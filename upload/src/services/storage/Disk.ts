import { Readable } from 'stream';
import fs from 'fs';

class Disk implements Services.Storage {
  constructor(
    protected directory: string,
    protected url: string
  ) {}

  public async store(body: Readable, path: string): Promise<void> {
    fs.mkdirSync(`${this.directory}${path.split('/').shift()}`, { recursive: true });

    const buffer = await this.stream2buffer(body);

    return new Promise((resolve, reject) => {
      fs.writeFile(`${this.directory}${path}`, buffer, function(err) {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  protected async stream2buffer(stream: Readable): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const _buf = Array<any>();

      stream.on('data', chunk => _buf.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(_buf)));
      stream.on('error', err => reject(err));
    });
  } 

  public async getUrl(path: string): Promise<string> {
    return `${this.url}${path}`;
  }
}

export default Disk;
