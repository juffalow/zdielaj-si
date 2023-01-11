declare namespace Jobs {
  interface Video {
    convert(file: File, height: number, width: number, thumbnailHeight: number, thumbnailWidth: number): Promise<void>;

    complete(payload: unknown): Promise<void>;
  }

  interface Image {
    resize(file: File, width: number, height: number): Promise<void>;
  }
}
