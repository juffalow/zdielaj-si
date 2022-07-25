import config from '../config';
import MediaConvertJobRepository from '../repositories/MediaConvertJobRepository';
import KnexMediaConvertJobRepository from '../repositories/KnexMediaConvertJobRepository';
import ThumbnailRepository from '../repositories/ThumbnailRepository';
import KnexThumbnailRepository from '../repositories/KnexThumbnailRepository';
import logger from '../logger';

class MediaConvertJob {

  private mediaConvertJobRepository: MediaConvertJobRepository;

  private thumbnailRepository: ThumbnailRepository;

  public constructor(mediaConvertJobRepository: MediaConvertJobRepository, thumbnailRepository: ThumbnailRepository) {
    this.mediaConvertJobRepository = mediaConvertJobRepository;
    this.thumbnailRepository = thumbnailRepository;
  }

  public async complete(payload: any): Promise<any> {
    const job = await this.mediaConvertJobRepository.get(payload.detail.jobId);

    if (typeof job === 'undefined') {
      logger.warn('Job not found!', { payload });
      return;
    }

    await Promise.all(payload.detail.outputGroupDetails[0].outputDetails[1].outputFilePaths.map(async (fullPath: string) => {
      await this.thumbnailRepository.create({
        mediaId: job.mediaId,
        mimetype: 'image/jpeg',
        path: fullPath.replace(`s3://${config.services.aws.bucket}/`, ''),
        height: payload.detail.outputGroupDetails[0].outputDetails[1].videoDetails.heightInPx,
        width: payload.detail.outputGroupDetails[0].outputDetails[1].videoDetails.widthInPx,
        size: 0,
      });
    }));

    await Promise.all(payload.detail.outputGroupDetails[0].outputDetails[2].outputFilePaths.map(async (fullPath: string) => {
      await this.thumbnailRepository.create({
        mediaId: job.mediaId,
        mimetype: 'image/jpeg',
        path: fullPath.replace(`s3://${config.services.aws.bucket}/`, ''),
        height: payload.detail.outputGroupDetails[0].outputDetails[2].videoDetails.heightInPx,
        width: payload.detail.outputGroupDetails[0].outputDetails[2].videoDetails.widthInPx,
        size: 0,
      });
    }));
  }
}

export default new MediaConvertJob(new KnexMediaConvertJobRepository(), new KnexThumbnailRepository());
