import { v4 as uuidv4 } from 'uuid';
import cls from 'cls-hooked';

const clsNamespace = cls.createNamespace('core');

export default function trace(req, res, next): void {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  clsNamespace.bind(req);
  clsNamespace.bind(res);

  const traceId = uuidv4();

  req.traceId = traceId;

  clsNamespace.run(() => {
    clsNamespace.set('traceId', traceId);

    next();
  });
}
