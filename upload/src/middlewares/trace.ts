import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import namespace from '../services/cls';

export default function trace(req: Request, res: Response, next: NextFunction): void {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  namespace.bind(req);
  namespace.bind(res);

  const traceId = req.query.traceId ? req.query.traceId : uuidv4();

  req['traceId'] = traceId;

  namespace.run(() => {
    namespace.set('traceId', traceId);

    next();
  });
}
