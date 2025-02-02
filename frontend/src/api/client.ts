import { getUserToken, getAlbumToken } from './token';
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
        throw new APIError(json.error.message, json.error.code, { url: response.url, status: response.status, headers: { 'X-Request-Id': response.headers.get('X-Request-Id') } });
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

function handleResponse(response: Response) {
  if (response.status === 204) {
    return {};
  } else if (response.headers.get('Content-Type')?.startsWith('application/json')) {
    return response.json();
  } else {
    return response.text();
  }
}

function getBackoffWithJitter(attempt: number, baseDelay = 500) {
  const jitter = Math.random() * baseDelay;

  return Math.min(((2 ** attempt) * baseDelay) + jitter, 16_000);
}

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export async function get<T>(endpoint: string, options = {} as { retries?: number, _attempt?: number } & RequestInit): Promise<T> {
  const headers = new Headers();
  const userToken = getUserToken();

  if (userToken !== null) {
    headers.set('Authorization',  `Bearer ${userToken}`);
  }

  const { retries = 3, _attempt = 0, ...requestOptions } = options;

  return fetch(endpoint, {
    ...requestOptions,
    method: 'GET',
    headers,
  })
    .then((response: Response) => {
      if (response.ok) {
        return response;
      }

      if (response.status >= 500 || response.status === 408 || response.status === 429) {
        return wait(getBackoffWithJitter(_attempt)).then(() => get(endpoint, { ...options, retries: retries - 1, _attempt: _attempt + 1 }));
      }

      return response;
    })
    .then(handleErrors)
    .then(handleSuccess<T>);
}

export async function post(endpoint: string, data: unknown, options = {} as { retries?: number, _attempt?: number } & RequestInit): Promise<any> {
  const headers = new Headers();
  const userToken = getUserToken();
  const albumToken = getAlbumToken();

  headers.set('Content-Type', 'application/json');

  if (userToken !== null) {
    headers.set('Authorization', `Bearer ${userToken}`);
  } else if (albumToken !== null) {
    headers.set('X-Album-Token', albumToken);
  }

  const { retries = 3, _attempt = 0, ...requestOptions } = options;

  return fetch(endpoint, {
    ...requestOptions,
    ...{
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }
  })
    .then((response: Response) => {
      if (response.ok) {
        return response;
      }

      if (response.status >= 500 || response.status === 408 || response.status === 429) {
        return wait(getBackoffWithJitter(_attempt)).then(() => get(endpoint, { ...options, retries: retries - 1, _attempt: _attempt + 1 }));
      }

      return response;
    })
    .then(handleErrors)
    .then(handleResponse);
}

export async function postMultipart(endpoint: string, data: FormData, options = {} as { retries?: number, _attempt?: number } & RequestInit): Promise<any> {
  const headers = new Headers();
  const userToken = getUserToken();

  if (userToken !== null) {
    headers.set('Authorization',  `Bearer ${userToken}`);
  }

  const { retries = 3, _attempt = 0, ...requestOptions } = options;

  return fetch(endpoint, {
    ...requestOptions,
    method: 'POST',
    headers,
    body: data,
  })
    .then((response: Response) => {
      if (response.ok) {
        return response;
      }

      if (response.status >= 500 || response.status === 408 || response.status === 429) {
        return wait(getBackoffWithJitter(_attempt)).then(() => get(endpoint, { ...options, retries: retries - 1, _attempt: _attempt + 1 }));
      }

      return response;
    })
    .then(handleErrors)
    .then(handleSuccess);
}

export async function httpDelete(endpoint: string, options?: RequestInit): Promise<any> {
  const headers = new Headers();
  const userToken = getUserToken();

  if (userToken !== null) {
    headers.set('Authorization',  `Bearer ${userToken}`);
  }

  return fetch(endpoint, {
    ...options,
    method: 'DELETE',
    headers,
  })
    .then(handleErrors)
    .then(handleSuccess);
}

export async function put(endpoint: string, data: unknown, options: RequestInit = {}): Promise<any> {
  const headers = new Headers();
  const userToken = getUserToken();
  const albumToken = getAlbumToken();

  headers.set('Content-Type', 'application/json');

  if (userToken !== null) {
    headers.set('Authorization', `Bearer ${userToken}`);
  } else if (albumToken !== null) {
    headers.set('X-Album-Token', albumToken);
  }

  return fetch(endpoint, {
    ...options,
    ...{
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    }
  })
    .then(handleErrors)
    .then(handleSuccess);
}
