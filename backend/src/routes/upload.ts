import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import sharp from 'sharp';
import { base64encode, bufferToStream } from '../utils/functions';
import AlbumRepository from '../repositories/KnexAlbumRepository';
import PhotoRepository from '../repositories/KnexPhotoRepository';
import S3Storage from '../storage/S3Storage';
import { generateToken } from '../utils/functions';

const fileFilter = (req: express.Request, file: any, cb: (err: unknown, isAccepted: boolean) => void) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const processFile = async (storage: S3Storage, directory: string, file: any): Promise<{ originalPath: string, thumbnailPath: string }> => {
  const hash = crypto.createHash('sha1').update(`${file.originalname}${Date.now()}`).digest('hex');
  const extname = path.extname(file.originalname);
  const original = bufferToStream(file.buffer);
  const thumbnail = sharp(file.buffer).resize(400, 400, { fit: 'inside' });
  let originalPath = null;
  let thumbnailPath = null;

  try {
    await storage.store(original, `${directory}/${hash}${extname}`);
    originalPath = `${directory}/${hash}${extname}`;
    /**
     * For some (random?) files it fails with error:
     * pngload_buffer: non-recoverable state
     * vips2png: unable to write to target target
     */
    await storage.store(thumbnail, `${directory}/thumbnail/${hash}${extname}`);
    thumbnailPath = `${directory}/thumbnail/${hash}${extname}`;
  } catch (err) {
    console.error(err);
  }

  return { originalPath, thumbnailPath };
};

const upload = multer({ fileFilter });

const router = express.Router();

router.post('/upload', upload.array('images', 10), async (req: express.Request, res: express.Response) => {
  const albumRepository = new AlbumRepository();
  const photoRepository = new PhotoRepository();
  const storage = new S3Storage();
  const userId = 'user' in req ? (req as any).user.id : null;

  const album = await albumRepository.create(userId);
  const directory = base64encode((new Date).toISOString().split('T')[0]);

  for (const file of (req as any).files) {
    const processedFile = await processFile(storage, directory, file);
    const photo = await photoRepository.create(album.id, processedFile.originalPath, (file as any).size);

    if (processedFile.thumbnailPath !== null) {
      await photoRepository.createThumbnail(album.id, photo.id, processedFile.thumbnailPath, 0);
    }
  }

  res.status(200).json({
    error: null,
    data: {
      album: {
        ...album,
      },
      user: {
        token: generateToken({ albumId: album.id }),
      },
    },
  }).end();
});

router.post('/upload/:id', upload.single('image'), async (req: express.Request, res: express.Response) => {
  const albumRepository = new AlbumRepository();
  const photoRepository = new PhotoRepository();
  const storage = new S3Storage();

  const album = await albumRepository.get(req.params.id);
  const count = await photoRepository.count(req.params.id);
  const directory = base64encode((new Date).toISOString().split('T')[0]);

  const user = 'user' in req ? (req as any).user : null;

  if (user !== null && 'id' in user) {
    if (album.userId !== user.id) {
      return res.status(400).json({
        error: {
          message: 'This album does not belong to you!',
        },
        data: null,
      }).end();
    }

    if (count === 0 || count > 50) {
      return res.status(400).json({
        error: {
          message: 'Album does not exist or album is full!',
        },
        data: null,
      }).end();
    }
  } else if (user !== null && 'albumId' in user) {
    if (album.id !== user.albumId) {
      return res.status(400).json({
        error: {
          message: 'This album does not belong to you!',
        },
        data: null,
      }).end();
    }

    if (count === 0 || count > 10) {
      return res.status(400).json({
        error: {
          message: 'Album does not exist or album is full!',
        },
        data: null,
      }).end();
    }
  } else {
    return res.status(400).json({
      error: {
        message: 'This album does not belong to you!',
      },
      data: null,
    }).end();
  }

  const processedFile = await processFile(storage, directory, (req as any).file);
  const photo = await photoRepository.create(album.id, processedFile.originalPath, (req as any).file.size);

  if (processedFile.thumbnailPath !== null) {
    await photoRepository.createThumbnail(album.id, photo.id, processedFile.thumbnailPath, 0);
  }

  res.status(200).json({
    error: null,
    data: {
      album: {
        ...album,
      }
    }
  }).end();
});

export default router;
