import { Request, Response, NextFunction } from 'express';
import tokenService from '../services/token';

export default async function auth(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  if (req.method === 'OPTIONS' || ('x-album-token' in req.headers === false)) {
    return next();
  }

  const token = (req.headers['x-album-token'] as string).replace('Bearer ', '');

  try {
    const payload = tokenService.JWT.verify(token);

    req['album'] = payload;
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized!' });
  }

  next();
}
