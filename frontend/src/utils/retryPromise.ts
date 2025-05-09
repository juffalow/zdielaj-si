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

export default async function retryOperation<T>(operation: () => Promise<T>, options: { retries: number, attempt?: number, onUnauthorized?: null | (() => Promise<unknown>) } = { retries: 3 }): Promise<T> {
  while ((options.attempt || 1) <= 15) {
    try {
      return await operation();
    } catch (error) {
      logger.debug('Retriable operation failed!', error);

      if ((options.attempt || 1) > options.retries) {
        throw error;
      }

      const miliseconds = getBackoffWithJitter(options.attempt || 1);

      logger.debug(`Retrying operation in ${miliseconds}ms...`);

      await wait(miliseconds);

      options.attempt = (options.attempt || 1) + 1;
    }
  }

  throw new Error('Max retries exceeded');
}
