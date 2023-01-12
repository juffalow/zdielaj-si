import { Request, Response, NextFunction } from 'express';
import APIError from '../errors/APIError';
import logger from '../logger';

export default function error(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof APIError) {
    res.status(err.code).json({
      error: {
        message: err.message,
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
