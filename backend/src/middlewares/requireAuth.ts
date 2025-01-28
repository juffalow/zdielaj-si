import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/APIError';

export default async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (typeof req['user'] === 'undefined') {
    next(new UnauthorizedError('Unauthorized!', 401));
  } else {
    next();
  }
}
