import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (data: Record<string, unknown>): string => {
  return jwt.sign(data, config.jwt.secret, { algorithm: 'HS512' });
}
