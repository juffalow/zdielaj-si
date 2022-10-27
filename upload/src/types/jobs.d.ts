declare namespace Jobs {
  interface Video {
    convert(media: Media, height: number, width: number, thumbnailHeight: number, thumbnailWidth: number): Promise<void>;

    complete(payload: unknown): Promise<void>;
  }

  interface Image {
    resize(media: Media, width: number, height: number): Promise<void>;
  }
}
