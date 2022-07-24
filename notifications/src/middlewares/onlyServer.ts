export default function internalAuth(req, res, next): void {
  if (req.method === 'OPTIONS') {
    next();
  }

  if ('user' in req === false || 'role' in req.user === false) {
    return res.status(401).json({ error: 'Unauthorized!' });
  }

  if (req.user.role !== 'server') {
    return res.status(401).json({ error: 'Unauthorized!' });
  }

  next();
}
