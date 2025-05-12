import logger from '../logger';

const getBackoffWithJitter = (attempt: number, baseDelay = 500) => {
  const jitter = Math.random() * baseDelay;

  return Math.min(((2 ** attempt) * baseDelay) + jitter, 16_000);
}

const wait = (delay: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const isUnauthorizedError = (error: unknown): boolean => {
  return typeof error === 'object' && 
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'status' in error.response &&
    error.response.status === 401;
}

export default async function retryOperation<T>(operation: () => Promise<T>, options: { retries: number, attempt?: number, onUnauthorized?: null | (() => Promise<unknown>) } = { retries: 3 }): Promise<T> {
  while ((options.attempt || 1) <= 15) {
    try {
      return await operation();
    } catch (error: unknown) {
      logger.debug('Retriable operation failed!', error);

      if ((options.attempt || 1) > options.retries) {
        throw error;
      }

      if (isUnauthorizedError(error) && typeof options.onUnauthorized === 'function') {
        logger.debug('Unauthorized error, retrying...');
        
        await options.onUnauthorized();
      }

      // @todo: check if response status is 500 or 408 or 429 and retry only if it is
      
      const miliseconds = getBackoffWithJitter(options.attempt || 1);

      logger.debug(`Retrying operation in ${miliseconds}ms...`);

      await wait(miliseconds);

      options.attempt = (options.attempt || 1) + 1;
    }
  }

  throw new Error('Max retries exceeded');
}
