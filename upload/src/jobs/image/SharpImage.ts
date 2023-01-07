import sharp from 'sharp';
import fetch from 'node-fetch';

/**
 * 
 * @see https://www.npmjs.com/package/sharp
 * @see https://github.com/lovell/sharp
 * @see https://sharp.pixelplumbing.com/
 */
class SharpImage implements Jobs.Image {
  constructor(
    protected storage: Services.Storage,
    protected thumbnailRepository: ThumbnailRepository
  ) {}

  public async resize(media: Media, width: number, height: number): Promise<void> {
    const imageUrl = await this.storage.getUrl(media.path);
    const imageBuffer = await this.loadImage(imageUrl);
  
    const image = await sharp(imageBuffer).resize(width, height).toBuffer();
  
    await this.storage.store(image, `${media.path.split('.')[0]}_thumbnail.${media.path.split('.')[1]}`);

    await this.thumbnailRepository.create({
      mediaId: media.id,
      mimetype: media.mimetype,
      path: `${media.path.split('.')[0]}_thumbnail.${media.path.split('.')[1]}`,
      size: image.length,
      metadata: {
        height,
        width,
      },
    });
  }

  private async loadImage(imageUrl: string): Promise<Buffer> {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer()
  
    return Buffer.from(new Uint8Array(arrayBuffer));
  }
}

export default SharpImage;
