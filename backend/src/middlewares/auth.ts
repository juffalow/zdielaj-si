import jwt from 'jsonwebtoken';
import config from '../config';

export default function auth(req, res, next): void {
  if (req.method === 'OPTIONS') {
    next();
  }

  if ('authorization' in req.headers) {
    const token = 'authorization' in req.headers ? req.headers.authorization.replace('Bearer ', '') : null;
    try {
      const user = jwt.verify(token, config.jwt.secret);
      req.user = user;
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized!' });
    }
  }

  next();
}
