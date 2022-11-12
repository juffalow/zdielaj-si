import fetch from 'node-fetch';
import { generateToken } from '../utils/functions';

interface BaseErrorConstructor {
  message: string;
  code: number;
}

class BaseError extends Error {
  public message: string;
  public code: number;

  constructor({ message, code }: BaseErrorConstructor) {
    super();
    this.message = message;
    this.code = code;
  }
}

async function handleErrors(response: any): Promise<any> {
  if (!response.ok) {
    if (response.headers.get('Content-Type').startsWith('application/json')) {
      const json = await response.json();
      if ('error' in json && json.error !== null) {
        if (typeof json.error === 'object' && 'message' in json.error) {
          throw new BaseError(json.error);
        }

        if (typeof json.error === 'string') {
          throw new BaseError({ message: json.error, code: -1 });
        }

        throw new BaseError({ message: 'Unknown error!', code: -1 });
      }
    }

    throw new BaseError({ message: response.statusText, code: response.status });
  }
  return response;
}

function handleSuccess(response: any) {
  if (response.headers.get('Content-Type').startsWith('application/json')) {
    return response.json();
  } else {
    return response.text();
  }
}

export async function get(endpoint: string, options?: RequestInit): Promise<any> {
  return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': generateToken({ role: 'server', service: 'core' }),
      },
      ...options,
    })
    .then(handleErrors)
    .then(handleSuccess);
}

export async function post(endpoint: string, data: unknown, options: RequestInit = {}): Promise<any> {
  return fetch(endpoint, {
    ...options,
    ...{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': generateToken({ role: 'server', service: 'core' }),
      },
      body: JSON.stringify(data),
    }
  })
  .then(handleErrors)
  .then(handleSuccess);
}
