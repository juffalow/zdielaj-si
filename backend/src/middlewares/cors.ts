import config from '../config';

export default function cors(req, res, next): void {
  const origin = req.get('origin');
  if (config.allowedOrigins.filter(allowedOrigin => allowedOrigin === origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Album-Token');
    res.header('Access-Control-Max-Age', '600');
  }

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}
