class FilesController {
  constructor(
    protected fileRepository: FileRepository,
    protected thumbnailRepository: ThumbnailRepository,
    protected storage: Services.Storage,
  ) {}

  public async getFile(id: string): Promise<File & { location: string; thumbnails: Thumbnail[] }> {  
    const file = await this.fileRepository.get(id);
    const thumbnails = await this.thumbnailRepository.getAll(id);
  
    const location = await this.storage.getUrl(file.path);
  
    const thumbnailsWithLocation = await Promise.all(thumbnails.map(async (thumbnail) => ({
      ...thumbnail,
      location: await this.storage.getUrl(thumbnail.path),
    })));

    return {
      ...file,
      location,
      thumbnails: thumbnailsWithLocation,
    };
  }
}

export default FilesController;
