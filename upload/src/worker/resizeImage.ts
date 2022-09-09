import sharp from 'sharp';
import fetch from 'node-fetch';
import container from '../container';

class ResizeImage {
  constructor(
    protected mediaRepository: MediaRepository,
    protected thumbnailRepository: ThumbnailRepository,
    protected storage: Services.Storage
  ) {}

  public async resize(mediaId: number, width: number, height: number): Promise<void> {
    const media = await this.getMedia(mediaId);
    const imageUrl = this.storage.getUrl(media.path);
    const imageBuffer = await this.loadImage(imageUrl);
  
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

export default new ResizeImage(
  container.get('repository.media'),
  container.get('repository.thumbnail'),
  container.get('service.storage')
);
