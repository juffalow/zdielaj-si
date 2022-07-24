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
        throw new BaseError(json.error);

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
      ...options,
      method: 'GET',
      headers: {
        'Authorization': generateToken({ role: 'server', service: 'core' }),
      },
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
