import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export default function auth(req: Request, res: Response, next: NextFunction): void {
  if (req.method === 'OPTIONS') {
    next();
  }

  if ('authorization' in req.headers) {
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
      const user = jwt.verify(token, config.jwt.secret);
      req['user'] = user;
    } catch (err) {
      res.status(401).json({ error: 'Unauthorized!' });
      return;
    }
  }

  next();
}
