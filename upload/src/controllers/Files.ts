import path from 'path';
import APIError from '../errors/APIError';

interface GetFileResponse extends File {
  location: string;
  thumbnails: Thumbnail[];
  playable?: {
    location: string;
  };
}

class FilesController {
  constructor(
    protected fileRepository: FileRepository,
    protected thumbnailRepository: ThumbnailRepository,
    protected storage: Services.Storage,
  ) {}

  public async getFile(id: string): Promise<GetFileResponse> {  
    const file = await this.fileRepository.get(id);

    if (typeof file === 'undefined') {
      throw new APIError({ message: 'File not found!', code: 404 });
    }

    const thumbnails = await this.thumbnailRepository.getAll(id);
  
    const location = await this.storage.getUrl(file.path);
    let playable = { location: null };

    if (file.mimetype.startsWith('video')) {
      playable = {
        location: await this.storage.getUrl(this.getPlayablePath(file)),
      }
    }
  
    const thumbnailsWithLocation = await Promise.all(thumbnails.map(async (thumbnail) => ({
      ...thumbnail,
      location: await this.storage.getUrl(thumbnail.path),
    })));

    return {
      ...file,
      location,
      thumbnails: thumbnailsWithLocation,
      ...(file.mimetype.startsWith('video') && { playable: playable }),
    };
  }

  protected getPlayablePath(file: File): string {
    return file.path.replace(path.extname(file.path), '.mp4');
  }
}

export default FilesController;
