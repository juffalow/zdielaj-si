import { Request, Response, NextFunction } from 'express';

export default async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  if (typeof req['user'] === 'undefined') {
    return res.status(401).json({ error: 'Unauthorized!' });
  }

  next();
}
