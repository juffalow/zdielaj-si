import { Readable } from 'stream';
import aws from '../services/aws';
import Storage from './Storage';
import config from '../config';
import logger from '../logger';

export default class S3Storage implements Storage {
  store(body: Readable, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const params = {
        // ACL: 'authenticated-read',
        serverSideEncryption: 'AES256',
        Bucket: config.services.aws.s3.bucket,
        Body: body,
        Key: path,
      };
      aws.s3.upload(params, (err) => {
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
    const signedUrl = aws.s3.getSignedUrl('getObject', {
      Bucket: config.services.aws.s3.bucket,
      Key: path,
      Expires: 60 * 10,
    });

    if (typeof config.services.aws.cf.url === 'undefined') {
      logger.warn('CloudFront URL is missing!');
      return signedUrl;
    }

    /*
     * Signed URL is in form https://<bucket name>.<region>.<domain>
     */
    return signedUrl.replace(`https://${config.services.aws.s3.bucket}.s3.${config.services.aws.region}.amazonaws.com`, config.services.aws.cf.url);
  }
}
