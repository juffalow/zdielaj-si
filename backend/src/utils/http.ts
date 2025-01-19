import { generateToken } from './functions';
import { BaseError, HTTPError } from './errors';
import namespace from '../services/cls';
import AWSXRay from '../logger/XRay';

class FetchClient implements Utils.HTTPClient {
  public async get(url: string, params: object = {}, options: RequestInit = {}): Promise<unknown> {
    const traceId = namespace.get('traceId');

    const segment = AWSXRay.getSegment();
    const xrayNamespace = AWSXRay.getNamespace();

    console.log('segment', segment);
    console.log('xrayNamespace', xrayNamespace);

    const searchParameters = new URLSearchParams();
  
    if (typeof traceId !== 'undefined') {
      searchParameters.append('traceId', traceId);
    }

    for (const key in params) {
      if (Array.isArray(params[key])) {
        Object.keys(params[key]).forEach((index) => {
          searchParameters.append(`${key}[${index}]`, params[key][index]);
        });
      } else {
        searchParameters.append(key, params[key]);
      }
    }

    return fetch(`${url}?${searchParameters}`, {
      method: 'GET',
      headers: {
        'Authorization': generateToken({ role: 'server', service: 'core' }),
      },
      ...options,
    })
    .then(this.handleErrors)
    .then(this.handleSuccess);
  }

  public async post(endpoint: string, data: unknown, options: RequestInit = {}): Promise<unknown> {
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
    .then(this.handleErrors)
    .then(this.handleSuccess);
  }

  public async delete(url: string, params: object = {}, options: RequestInit = {}): Promise<unknown> {
    const traceId = namespace.get('traceId');
    const searchParameters = new URLSearchParams();
  
    if (typeof traceId !== 'undefined') {
      searchParameters.append('traceId', traceId);
    }

    for (const key in params) {
      if (Array.isArray(params[key])) {
        Object.keys(params[key]).forEach((index) => {
          searchParameters.append(`${key}[${index}]`, params[key][index]);
        });
      } else {
        searchParameters.append(key, params[key]);
      }
    }

    return fetch(`${url}?${searchParameters}`, {
      method: 'DELETE',
      headers: {
        'Authorization': generateToken({ role: 'server', service: 'core' }),
      },
      ...options,
    })
    .then(this.handleErrors)
    .then(this.handleSuccess);
  }

  /**
   * 
   * @param response 
   * @returns 
   */
  protected handleSuccess(response: Response): Promise<unknown> {
    if (response.headers.get('Content-Type').startsWith('application/json')) {
      return response.json();
    } else {
      return response.text();
    }
  }

  /**
   * 
   * @param response 
   * @returns 
   * @throws BaseError
   */
  protected async handleErrors(response: Response): Promise<unknown> {
    if (!response.ok) {
      if (response.headers.get('Content-Type').startsWith('application/json')) {
        const json = await response.json();

        const code = typeof json.error === 'object' && 'code' in json.error ? json.error.code : response.status;
        const message = typeof json.error === 'object' && 'message' in json.error ? json.error.message : typeof json.error === 'string' ? json.error : response.statusText;

        throw new HTTPError({
          message,
          code,
          request: {
            url: response.url,
          },
          response: {
            status: response.status,
            body: json,
          },
        });
      }
  
      throw new BaseError({ message: response.statusText, code: response.status });
    }

    return response;
  }
}

export default FetchClient;
