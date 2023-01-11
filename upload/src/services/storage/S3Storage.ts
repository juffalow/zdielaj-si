import { Readable } from 'stream';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import logger from '../../logger';

class S3Storage implements Services.Storage {
  constructor(
    protected s3: S3Client,
    protected bucket: string,
    protected region: string,
    protected cloudFrontUrl?: string
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
      const parallelUploads3 = new Upload({
        client: this.s3,
        params,
        tags: [],
        leavePartsOnError: false,
      });
    
      parallelUploads3.on('httpUploadProgress', (progress) => {
        logger.debug('Upload processing...', { progress });
      });
    
      await parallelUploads3.done();
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

    if (typeof this.cloudFrontUrl === 'undefined') {
      logger.warn('CloudFront URL is missing!');
      return signedUrl;
    }

    /*
     * Signed URL is in form https://<bucket name>.<region>.<domain>
     */
    return signedUrl.replace(`https://${this.bucket}.s3.${this.region}.amazonaws.com`, this.cloudFrontUrl);
  }
}

export default S3Storage;
