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
      },
      conversions?: string[],
    },
  },
}

interface ListFilesResponse {
  error: unknown,
  data: {
    files: {
      id: string,
      mimetype: string,
      size: number,
      location: string,
      metadata: {
        width: number,
        height: number,
        [key: string]: string | number | boolean,
      }
      thumbnails?: {
        fileId: number,
        mimetype: string,
        size: number,
        location: string,
      },
      conversions?: string[],
    }[],
  },
}

declare namespace Services {
  type Database = import ('@aws-sdk/client-dynamodb').DynamoDBClient;
  
  interface Notifications {
    notify(data: unknown): Promise<unknown>;

    getSettings(email: string, token: string): Promise<unknown>;

    setSettings(params: { email: string, notifications: Setting[] }, token: string): Promise<unknown>;
  }

  interface Upload {
    getFile(id: ID): Promise<GetFileResponse>;
    
    listFiles(ids: ID[]): Promise<ListFilesResponse>;

    deleteFile(id: ID): Promise<unknown>;
  }
  
  interface Token {
    generate(data: Record<string, unknown>, expiresIn?: number): string;

    verify(token: string): Record<string, unknown> | Promise<Record<string, unknown>>;

    decode(token: string): unknown;

    getUserId(data: Record<string, unknown>): { id: number | string };
  }

  interface User {
    get(token: string): Promise<{ id: string, username: string, email: string, name: string }>;
  }

  interface Trace {
    openSegment(defaultName: string): unknown;

    closeSegment(): unknown;

    createSegment(name: string, rootId?: string | null, parentId?: string | null): unknown;

    setSegment(segment: unknown): void;

    getTraceId(): string;

    getNamespace(): unknown;

    captureAWSv3Client<T>(client: T): T;

    captureHTTPRequests(): void;

    processTraceData(data: string): { [key: string]: string };
  }
}
