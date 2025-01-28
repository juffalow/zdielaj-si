import { generateToken } from './functions';
import { HTTPError } from '../errors/HTTP';
import services from '../services';

class FetchClient implements Utils.HTTPClient {
  public async get(url: string, params: object = {}, options: RequestInit = {}): Promise<unknown> {
    const traceId = services.Trace.getTraceId();

    const searchParameters = new URLSearchParams();

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
        'X-Request-Id': traceId,
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
    const traceId = services.Trace.getTraceId();
    const searchParameters = new URLSearchParams();

    for (const key in params) {
      if (Array.isArray(params[key])) {
        Object.keys(params[key]).forEach((index) => {
          searchParameters.append(`${key}[${index}]`, params[key][index]);
        });
      } else {
        searchParameters.append(key, params[key]);
      }
    }

    const { headers, ...restOptions } = options;

    return fetch(`${url}?${searchParameters}`, {
      method: 'DELETE',
      headers: {
        'Authorization': generateToken({ role: 'server', service: 'core' }),
        'X-Request-Id': traceId,
        ...headers,
      },
      ...restOptions,
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

        const message = typeof json.error === 'object' && 'message' in json.error ? json.error.message : typeof json.error === 'string' ? json.error : response.statusText;

        throw new HTTPError(
          message,
          {
            url: response.url,
          }, {
            status: response.status,
            body: json,
          },
        );
      }
  
      throw new Error(response.statusText);
    }

    return response;
  }
}

export default FetchClient;
