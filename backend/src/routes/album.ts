import express from 'express';
import config from '../config';
import PhotoRepository from '../repositories/KnexPhotoRepository';

const router = express.Router();

router.get('/:id', async (req: any, res) => {
  const photoRepository = new PhotoRepository();

  const photos = await photoRepository.find(req.params.id);

  if (typeof photos === 'undefined') {
    res.status(404).json({
      error: 'Album not found!',
      data: null,
    }).end();
    return;
  }

  const photosWithLocation = photos.map((photo) => ({
    ...photo,
    location: `${config.storage.url}/${photo.path}`,
    thumbnail: photo.thumbnail !== null ?  {
      ...photo.thumbnail,
      location: `${config.storage.url}/${photo.thumbnail.path}`,
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
