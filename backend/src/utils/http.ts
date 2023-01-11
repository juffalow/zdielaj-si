import { generateToken } from './functions';
import { BaseError } from './errors';
import namespace from '../services/cls';

class FetchClient implements Utils.HTTPClient {
  public async get(url: string, params: object = {}, options: RequestInit = {}): Promise<unknown> {
    const traceId = namespace.get('traceId');
    const searchParameters = new URLSearchParams();
  
    if (typeof traceId !== 'undefined') {
      searchParameters.append('traceId', traceId);
    }

    for (const key in params) {
      searchParameters.append(key, params[key]);
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
}

export default FetchClient;
