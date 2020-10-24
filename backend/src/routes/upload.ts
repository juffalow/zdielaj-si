import express from 'express';
import aws from 'aws-sdk';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';
import sharp from 'sharp';
import { Readable } from 'stream';
import config from '../config';
import { base64encode } from '../utils/functions';
import AlbumRepository from '../repositories/ArrayAlbumRepository';
import PhotoRepository from '../repositories/ArrayPhotoRepository';

const bufferToStream = (buffer: Buffer) => {
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}

const s3 = new aws.S3({
  accessKeyId: config.storage.key,
  endpoint: config.storage.endpoint,
  secretAccessKey: config.storage.secret,
});

const upload = multer();

const uploadImage = async (body: any, key: string) => {
  return new Promise((resolve, reject) => {
    const params = {
      ACL: 'public-read',
      Bucket: config.storage.bucket,
      Body: body,
      Key: key,
    };
    const uploader = s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(key);
      }
    });
  });
};

const router = express.Router();

router.post('/upload', upload.array('images', 10), async (req: any, res) => {
  const albumRepository = new AlbumRepository();
  const photoRepository = new PhotoRepository();

  const album = await albumRepository.create();
  const images = [];

  const directory = base64encode((new Date).toISOString().split('T')[0]);

  for (const file of req.files) {
    const hash = crypto.createHash('sha1').update(`${file.originalname}${Date.now()}`).digest('hex');
    const extname = path.extname(file.originalname);
    const original = bufferToStream(file.buffer);
    const thumbnail = sharp(file.buffer).resize({ width: 200 });
    let originalPath = null;
    let thumbnailPath = null;

    try {
      originalPath = await uploadImage(original, `${directory}/${hash}${extname}`);
      /**
       * For some (random?) files it fails with error:
       * pngload_buffer: non-recoverable state
       * vips2png: unable to write to target target
       */
      thumbnailPath = await uploadImage(thumbnail, `${directory}/thumbnail/${hash}${extname}`);
    } catch (err) {
      console.error(err);
    }

    const photo = await photoRepository.create(album.id, originalPath, (file as any).size);
    photo['location'] = `${config.storage.url}/${originalPath}`;

    if (thumbnailPath !== null) {
      const thumbnail = await photoRepository.createThumbnail(album.id, photo.id, thumbnailPath, 0);
      photo.thumbnail = thumbnail;
      photo.thumbnail.location = `${config.storage.url}/${thumbnailPath}`;
    }

    images.push(photo);
  }

  res.status(200).json({
    error: null,
    data: {
      album: {
        ...album,
        photos: images,
      }
    }
  }).end();
});

export default router;
