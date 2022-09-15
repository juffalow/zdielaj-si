import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export default function error(err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error('Something went wrong!', { error: { message: err.message, stack: err.stack } });

  res.status(500).json({
    error: {
      message: 'Something went wrong!',
    },
    data: null,
  });

  return;
}
