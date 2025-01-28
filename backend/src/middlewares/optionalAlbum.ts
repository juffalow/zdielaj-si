import type { Request, Response, NextFunction } from 'express';
import tokenService from '../services/token';

export default async function optionalAlbum(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (req.method !== 'OPTIONS' && 'x-album-token' in req.headers) {
    const token = (req.headers['x-album-token'] as string).replace('Bearer ', '');

    const payload = tokenService.JWT.verify(token);
    req['album'] = payload;
  }

  next();
}
