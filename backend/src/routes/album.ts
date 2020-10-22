import express from 'express';
import config from '../config';
import PhotoRepository from '../repositories/ArrayPhotoRepository';

const router = express.Router();

router.get('/:id', async (req: any, res) => {
  const photoRepository = new PhotoRepository();

  const photos = await photoRepository.find(req.params.id);
  const photosWithLocation = photos.map((photo) => ({
    ...photo,
    location: `${config.storage.url}/${photo.path}`,
  }));

  res.status(200).json({
    error: null,
    data: {
      photos: photosWithLocation,
    }
  }).end();
});

export default router;
