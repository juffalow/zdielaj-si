import { Readable } from 'stream';
import { S3, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import logger from '../../logger';

class Spaces implements Services.Storage {
  constructor(
    protected s3: S3,
    protected bucket: string,
    protected region: string,
    protected url?: string
  ) {}

  public async store(body: Readable, path: string): Promise<void> {
    const params = {
      // ACL: 'authenticated-read',
      // serverSideEncryption: 'AES256',
      Bucket: this.bucket,
      Body: body,
      Key: path,
    };

    try {
      await this.s3.send(new PutObjectCommand(params));
    } catch (err) {
      logger.error('Unable to store file!', { error: { message: err.message, stack: err.stack } });
      throw err;
    }
  }

  public async getUrl(path: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: path,
    });

    const signedUrl = await getSignedUrl(this.s3, command, {
      expiresIn: 60 * 10,
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
