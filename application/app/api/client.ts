import { getUserIDToken } from './auth';
import { APIError } from './errors';

interface BaseErrorConstructor {
  message: string;
  code: number;
}

class BaseError extends Error {
  public message: string;
  public code: number;

  constructor({ message, code }: BaseErrorConstructor) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

async function handleErrors(response: Response | unknown): Promise<Response> {
  if (response instanceof Response === false) {
    throw new BaseError({ message: 'Unknown error', code: 0 });
  }

  if (!response.ok) {
    if (response.headers.get('Content-Type')?.startsWith('application/json')) {
      const json = await response.json();
      if ('error' in json && json.error !== null) {
        throw new APIError(json.error.message, json.error.code, {
          url: response.url,
          status: response.status /*, headers: { 'X-Request-Id': response.headers.get('X-Request-Id') } */,
        });
      }
    }

    throw new BaseError({ message: response.statusText, code: response.status });
  }

  return response;
}

function handleSuccess<T>(response: Response): Promise<T> {
  if (response.headers.get('Content-Type')?.startsWith('application/json') === false) {
    throw new BaseError({ message: 'Unsupported content type!', code: 0 });
  }

  if (response.status === 204) {
    return Promise.resolve({} as T);
  }

  return response.json();
}

export async function get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { headers, ...rest } = options;

  return fetch(endpoint, {
    headers: {
      ...(typeof import.meta.env.VITE_API_KEY === 'string' && { 'X-API-Key': import.meta.env.VITE_API_KEY }),
      ...headers,
    },
    ...rest,
    method: 'GET',
  })
    .then(handleErrors)
    .then(handleSuccess<T>);
}

export async function protectedGet<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { headers, ...rest } = options;
  const token = await getUserIDToken();

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(typeof import.meta.env.VITE_API_KEY === 'string' && { 'X-API-Key': import.meta.env.VITE_API_KEY }),
      ...headers,
    },
    ...rest,
    method: 'GET',
  })
    .then(handleErrors)
    .then(handleSuccess<T>);
}

export async function post<T>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> {
  const { headers, ...rest } = options;

  return fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...(typeof import.meta.env.VITE_API_KEY === 'string' && { 'X-API-Key': import.meta.env.VITE_API_KEY }),
      ...headers,
    },
    ...rest,
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then(handleSuccess<T>);
}

export async function protectedPost<T>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> {
  const { headers, ...rest } = options;
  const token = await getUserIDToken();

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(typeof import.meta.env.VITE_API_KEY === 'string' && { 'X-API-Key': import.meta.env.VITE_API_KEY }),
      ...headers,
    },
    ...rest,
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then(handleSuccess<T>);
}

export async function protectedPostMultipart(
  endpoint: string,
  data: FormData,
  options = {} as { retries?: number; _attempt?: number } & RequestInit
): Promise<any> {
  const { headers, ...rest } = options;
  const token = await getUserIDToken();

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(typeof import.meta.env.VITE_API_KEY === 'string' && { 'X-API-Key': import.meta.env.VITE_API_KEY }),
      ...headers,
    },
    ...rest,
    method: 'POST',
    body: data,
  })
    .then(handleErrors)
    .then(handleSuccess);
}

export async function protectedDelete(endpoint: string, options: RequestInit = {}): Promise<any> {
  const { headers, ...rest } = options;
  const token = await getUserIDToken();

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(typeof import.meta.env.VITE_API_KEY === 'string' && { 'X-API-Key': import.meta.env.VITE_API_KEY }),
      ...headers,
    },
    ...rest,
    method: 'DELETE',
  })
    .then(handleErrors)
    .then(handleSuccess);
}

export async function protectedPut(endpoint: string, data: unknown, options: RequestInit = {}): Promise<any> {
  const { headers, ...rest } = options;
  const token = await getUserIDToken();

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(typeof import.meta.env.VITE_API_KEY === 'string' && { 'X-API-Key': import.meta.env.VITE_API_KEY }),
      ...headers,
    },
    ...rest,
    method: 'PUT',
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then(handleSuccess);
}

export async function protectedPatch<T>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<T> {
  const { headers, ...rest } = options;
  const token = await getUserIDToken();

  return fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(typeof import.meta.env.VITE_API_KEY === 'string' && { 'X-API-Key': import.meta.env.VITE_API_KEY }),
      ...headers,
    },
    ...rest,
    method: 'PATCH',
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then(handleSuccess<T>);
}
