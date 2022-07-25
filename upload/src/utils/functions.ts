import { Readable } from 'stream';
import crypto from 'crypto';
import path from 'path';
import { Request } from 'express';
import sizeOf from 'image-size';
import ffmpeg from 'fluent-ffmpeg';
import S3Storage from '../storage/S3Storage';

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

export const fileFilter = (req: Request, file: any, cb: (err: unknown, isAccepted: boolean) => void) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

export const processFile = async (storage: S3Storage, directory: string, file: any): Promise<string> => {
  if (file.mimetype.startsWith('image/')) {
    return processImageFile(storage, directory, file);
  }

  if (file.mimetype.startsWith('video/')) {
    return processVideoFile(storage, directory, file);
  }
}

export const processImageFile = async (storage: S3Storage, directory: string, file: any): Promise<string> => {
  const hash = crypto.createHash('sha1').update(`${file.originalname}${Date.now()}`).digest('hex');
  const extname = path.extname(file.originalname);
  const original = bufferToStream(file.buffer);

  await storage.store(original, `${directory}/${hash}${extname}`);

  return `${directory}/${hash}${extname}`;
}

export const processVideoFile = async (storage: S3Storage, directory: string, file: any): Promise<string> => {
  const hash = crypto.createHash('sha1').update(`${file.originalname}${Date.now()}`).digest('hex');
  const extname = path.extname(file.originalname);
  const original = bufferToStream(file.buffer);

  await storage.store(original, `${directory}/${hash}${extname}`);

  return `${directory}/${hash}${extname}`;
}

export const getDimensions = (height: number, width: number, maxHeight: number, maxWidth: number): { height: number, width: number } => {
  if (typeof height === 'undefined' || typeof width === 'undefined') {
    return {
      width: maxWidth,
      height: maxHeight
    };
  }
  
  if (height > width && height > maxHeight) {
    return {
      height: maxHeight,
      width: width * Math.ceil(maxHeight / height),
    };
  }

  if (width > height && width > maxWidth) {
    return {
      height: height * Math.ceil(maxWidth / width),
      width: maxWidth,
    };
  }

  return {
    height,
    width,
  };
}

export const getImageDimensions = (buffer: Buffer): { height: number, width: number } => {
  const dimensions = sizeOf(buffer);

  return dimensions;
}

export const getVideoDimensions = async (stream: Readable): Promise<{ height: number, width: number }> => {
  return new Promise((resolve) => {
    ffmpeg.ffprobe(stream, function(err, metadata) {
      if (err !== null) {
        return resolve({ height: undefined, width: undefined });
      }

      const stream = metadata.streams.find(stream => {
        return 'height' in stream && 'width' in stream;
      });

      resolve({
        height: typeof stream === 'undefined' ? undefined : stream.height,
        width: typeof stream === 'undefined' ? undefined : stream.width,
      });
    });
  });
}