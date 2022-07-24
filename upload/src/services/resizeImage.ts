import sharp from 'sharp';
import fetch from 'node-fetch';
import MediaRepository from '../repositories/MediaRepository';
import KnexMediaRepository from '../repositories/KnexMediaRepository';
import Storage from '../storage/Storage';
import S3Storage from '../storage/S3Storage';

class ResizeImage {

  private mediaRepository: MediaRepository;

  private storage: Storage;

  public constructor(mediaRepository: MediaRepository, storage: Storage) {
    this.mediaRepository = mediaRepository;
    this.storage = storage;
  }

  public async resize(mediaId: number, width: number, height: number): Promise<any> {
    const media = await this.getMedia(mediaId);
    const imageUrl = this.storage.getUrl(media.path);
    const imageBuffer = await this.loadImage(imageUrl);
  
    const image = sharp(imageBuffer).resize(width, height, { fit: 'inside' });
  
    await this.storage.store(image, `${directory}/${hash}${extname}`);
  }

  private async getMedia(id: number): Promise<Media> {
    const media = await this.mediaRepository.get(String(id));
  
    return media;
  }

  private async loadImage(imageUrl: string): Promise<ArrayBuffer> {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
  
    return buffer;
  }
}

export default new ResizeImage(new KnexMediaRepository(), new S3Storage());
