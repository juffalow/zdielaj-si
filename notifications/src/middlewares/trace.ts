import { v4 as uuidv4 } from 'uuid';
import namespace from '../services/cls';

export default function trace(req, res, next): void {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  namespace.bind(req);
  namespace.bind(res);

  const traceId = req.query.traceId ? req.params.traceId : uuidv4();

  req.traceId = traceId;

  namespace.run(() => {
    namespace.set('traceId', traceId);

    next();
  });
}
