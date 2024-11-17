export default function wrapPromise<T>(promise: Promise<T> & { status?: string, result?: T | Error }): () => T {
  promise.status = 'pending';
  const suspender = promise.then(
    (res: T) => {
      promise.status = 'success';
      promise.result = res;
    },
    (err: Error) => {
      promise.status = 'error';
      promise.result = err;
    },
  );

  return function() {
    if (promise.status === 'pending') throw suspender;
    if (promise.status === 'error') throw promise.result;

    return promise.result as T;
  };
}
