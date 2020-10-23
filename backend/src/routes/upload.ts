import express from 'express';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto';
import path from 'path';
import config from '../config';
import { base64encode } from '../utils/functions';
import AlbumRepository from '../repositories/ArrayAlbumRepository';
import PhotoRepository from '../repositories/ArrayPhotoRepository';

const s3 = new aws.S3({
  accessKeyId: config.storage.key,
  endpoint: config.storage.endpoint,
  secretAccessKey: config.storage.secret,
});

const upload = multer({
  storage: multerS3({
    acl: 'public-read',
    bucket: config.storage.bucket,
    key: (req: any, file, callback) => {
      const directory = base64encode((new Date).toISOString().split('T')[0]);
      const hash = crypto.createHash('sha1').update(`${file.originalname}${Date.now()}`).digest('hex');
      const extname = path.extname(file.originalname);
      callback(null, `${directory}/${hash}${extname}`);
    },
    s3,
  }),
});

const router = express.Router();

router.post('/:hash/upload', upload.array('images', 10), async (req: any, res) => {
  const images = req.files.map((file) => ({
    filename: file.originalname,
    location: file.location,
    mimetype: file.mimetype,
    size: file.size,
  }));

  res.status(200).json({ error: null, data: images }).end();
});

router.post('/upload', upload.array('images', 10), async (req: any, res) => {
  console.log('/upload', req.files);

  const albumRepository = new AlbumRepository();
  const photoRepository = new PhotoRepository();

  const album = await albumRepository.create();
  const images = [];

  for (const file of req.files) {
    const photo = await photoRepository.create(album.id, (file as any).key, (file as any).size);
    images.push({
      ...photo,
      location: `${config.storage.url}/${photo.path}`,
    });
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
