import logger from '../logger';

class Container {
  private _cache: object;

  public constructor() {
    this._cache = {};
  }

  public register<T>(name: string, cb: (object?: Container) => T): Container {
    Object.defineProperty(this, name, {
      get: () => {
        if (!Object.prototype.hasOwnProperty.call(this._cache, name)) {
          this._cache[name] = cb(this);
        }

        return this._cache[name];
      },
      configurable: true,
      enumerable: true
    });

    return this;
  }

  public get<T>(name: string): T {
    if (!Object.prototype.hasOwnProperty.call(this, name)) {
      logger.warn('No registered service under this name!', { name });
    }
    
    return this[name];
  }
}

export default Container;
