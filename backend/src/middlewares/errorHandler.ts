import type { Request, Response, NextFunction } from 'express';
import APIError from '../errors/APIError';
import logger from '../logger';
import { HTTPError } from 'errors/HTTP';

/* eslint-disable  @typescript-eslint/no-unused-vars */
export default function error(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof APIError) {
    res.status(err.response.status).json({
      error: {
        message: err.message,
        code: err.code,
      },
      data: null,
    }).end();
  } else if (err instanceof HTTPError) {
    logger.error('Something went wrong!', { error: { message: err.message, url: err.request.url, body: err.response.body, stack: err.stack } });

    res.status(err.response.status).json({
      error: {
        message: err.message,
        code: err.code,
      },
      data: null,
    }).end();
  } else {
    logger.error('Something went wrong!', { error: { message: err.message, stack: err.stack } });

    res.status(500).json({
      error: {
        message: 'Something went wrong!',
      },
      data: null,
    }).end();
  }

  return;
}
