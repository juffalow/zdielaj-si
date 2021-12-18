import express from 'express';
import PhotoRepository from '../repositories/KnexPhotoRepository';
import S3Storage from '../storage/S3Storage';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response) => {
  const photoRepository = new PhotoRepository();

  const photos = await photoRepository.find(req.params.id);
  const storage = new S3Storage();

  if (typeof photos === 'undefined' || photos.length === 0) {
    res.status(404).json({
      error: 'Album not found!',
      data: null,
    }).end();
    return;
  }

  const photosWithLocation = photos.map((photo) => ({
    ...photo,
    location: storage.getUrl(photo.path),
    thumbnail: photo.thumbnail !== null ?  {
      ...photo.thumbnail,
      location: photo.mimetype.startsWith('video/') ? null : storage.getUrl(photo.thumbnail.path),
    } : null,
  }));

  res.status(200).json({
    error: null,
    data: {
      photos: photosWithLocation,
    }
  }).end();
});

export default router;
