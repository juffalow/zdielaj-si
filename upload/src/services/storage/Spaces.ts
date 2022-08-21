import { Readable } from 'stream';
import { S3 } from 'aws-sdk';
import logger from '../../logger';

class Spaces implements Services.Storage {
  constructor(
    protected s3: S3,
    protected bucket: string,
    protected region: string,
    protected url?: string
  ) {}

  public store(body: Readable, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const params = {
        ACL: 'public-read',
        Bucket: this.bucket,
        Body: body,
        Key: path,
      };
      this.s3.upload(params, (err) => {
        if (err) {
          logger.error('Unable to store file!', { error: { message: err.message, stack: err.stack } });
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public getUrl(path: string): string {
    const signedUrl = this.s3.getSignedUrl('getObject', {
      Bucket: this.bucket,
      Key: path,
      Expires: 60 * 10,
    });

    if (typeof this.url === 'undefined') {
      logger.warn('URL is missing!');
      return signedUrl;
    }

    /*
     * Signed URL is in form https://<bucket name>.<region>.<domain>
     */
    return signedUrl.replace(`https://${this.bucket}.${this.region}.digitaloceanspaces.com`, this.url);
  }
}

export default Spaces;