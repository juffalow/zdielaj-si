import { Readable } from 'stream';
import aws from 'aws-sdk';
import Storage from './Storage';
import config from '../config';
import logger from '../logger';

const s3 = new aws.S3({
  accessKeyId: config.storage.key,
  endpoint: config.storage.endpoint,
  secretAccessKey: config.storage.secret,
});

export default class S3Storage implements Storage {
  store(body: Readable, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const params = {
        ACL: 'authenticated-read',
        serverSideEncryption: 'AES256',
        Bucket: config.storage.bucket,
        Body: body,
        Key: path,
      };
      s3.upload(params, (err) => {
        if (err) {
          logger.error('Unable to store file!', { error: { message: err.message, stack: err.stack } });
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  getUrl(path: string): string {
    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: config.storage.bucket,
      Key: path,
      Expires: 60 * 10,
    });

    /*
     * Signed URL is in form https://<bucket name>.<region>.<domain>
     */
    return signedUrl.replace(config.storage.originalUrl, config.storage.url);
  }
}
