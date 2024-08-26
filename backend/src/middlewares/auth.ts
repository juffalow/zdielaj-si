import { Request, Response, NextFunction } from 'express';
import services from '../services';

export default async function auth(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  if (req.method === 'OPTIONS' || ('authorization' in req.headers === false)) {
    return next();
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const payload = services.Token.verify(token);

    const data = payload instanceof Promise ? await payload : payload;

    req['user'] = services.Token.getUserId(data);
  } catch {
    return res.status(401).json({ error: 'Unauthorized!' });
  }

  next();
}
