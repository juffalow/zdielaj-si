type Setting = [
  notification: string,
  isEnabled: boolean,
]

interface GetMediaResponse {
  error: unknown,
  data: {
    media: {
      id: number,
      mimetype: string,
      size: number,
      location: string,
      thumbnails?: {
        mediaId: number,
        mimetype: string,
        size: number,
        location: string,
      }
    },
  },
}

declare namespace Services {
  interface Notifications {
    notify(data: unknown): Promise<unknown>;

    getSettings(email: string, token: string): Promise<unknown>;

    setSettings(params: { email: string, notifications: Setting[] }, token: string): Promise<unknown>;
  }

  interface Upload {
    getFile(id: number): Promise<GetMediaResponse>;
  }
}
