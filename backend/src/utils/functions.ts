import { Readable } from 'stream';
import jwt from 'jsonwebtoken';
import config from '../config';

export const base64encode = (str: string): string => {
  return Buffer.from(str).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const bufferToStream = (buffer: Buffer): Readable => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}

export const generateToken = (data: Record<string, unknown>): string => {
  return jwt.sign(data, config.jwt.secret, { algorithm: 'HS512' });
}
