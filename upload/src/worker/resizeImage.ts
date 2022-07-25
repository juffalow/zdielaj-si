import sharp from 'sharp';
import fetch from 'node-fetch';
import sizeOf from 'image-size';
import MediaRepository from '../repositories/MediaRepository';
import KnexMediaRepository from '../repositories/KnexMediaRepository';
import ThumbnailRepository from '../repositories/ThumbnailRepository';
import KnexThumbnailRepository from '../repositories/KnexThumbnailRepository';
import Storage from '../storage/Storage';
import S3Storage from '../storage/S3Storage';
import { getDimensions } from '../utils/functions';

class ResizeImage {

  private mediaRepository: MediaRepository;

  private thumbnailRepository: ThumbnailRepository;

  private storage: Storage;

  public constructor(mediaRepository: MediaRepository, thumbnailRepository: ThumbnailRepository, storage: Storage) {
    this.mediaRepository = mediaRepository;
    this.thumbnailRepository = thumbnailRepository;
    this.storage = storage;
  }

  public async resize(mediaId: number, maxWidth: number, maxHeight: number): Promise<void> {
    const media = await this.getMedia(mediaId);
    const imageUrl = this.storage.getUrl(media.path);
    const imageBuffer = await this.loadImage(imageUrl);
    const dimensions = sizeOf(imageBuffer);
    const { width, height } = getDimensions(dimensions.height, dimensions.width, maxHeight, maxWidth);
  
    const image = sharp(imageBuffer).resize(width, height, { fit: 'inside' });
  
    await this.storage.store(image, `${media.path.split('.')[0]}_thumbnail.${media.path.split('.')[1]}`);

    await this.thumbnailRepository.create({
      mediaId: media.id,
      mimetype: media.mimetype,
      path: `${media.path.split('.')[0]}_thumbnail.${media.path.split('.')[1]}`,
      height,
      width,
      size: 0,
    });
  }

  private async getMedia(id: number): Promise<Media> {
    const media = await this.mediaRepository.get(String(id));
  
    return media;
  }

  private async loadImage(imageUrl: string): Promise<Buffer> {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer()
  
    return Buffer.from(new Uint8Array(arrayBuffer));
  }
}

export default new ResizeImage(new KnexMediaRepository(), new KnexThumbnailRepository(), new S3Storage());
