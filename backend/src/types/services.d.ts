type Setting = [
  notification: string,
  isEnabled: boolean,
]

interface GetFileResponse {
  error: unknown,
  data: {
    file: {
      id: number,
      mimetype: string,
      size: number,
      location: string,
      thumbnails?: {
        fileId: number,
        mimetype: string,
        size: number,
        location: string,
      }
    },
  },
}

interface ListFilesResponse {
  error: unknown,
  data: {
    files: {
      id: number,
      mimetype: string,
      size: number,
      location: string,
      thumbnails?: {
        fileId: number,
        mimetype: string,
        size: number,
        location: string,
      }
    }[],
  },
}

declare namespace Services {
  interface Notifications {
    notify(data: unknown): Promise<unknown>;

    getSettings(email: string, token: string): Promise<unknown>;

    setSettings(params: { email: string, notifications: Setting[] }, token: string): Promise<unknown>;
  }

  interface Upload {
    getFile(id: ID): Promise<GetFileResponse>;
    
    listFiles(ids: ID[]): Promise<ListFilesResponse>;
  }

  interface Geolocation {
    getLocation(ip: string): Promise<{ city: string, country: string }>;
  }

  interface Token {
    generate(data: Record<string, unknown>, expiresIn?: number): string;

    verify(token: string): Record<string, unknown> | Promise<Record<string, unknown>>;

    decode(token: string): unknown;

    getUserId(data: Record<string, unknown>): { id: number | string };
  }
}
