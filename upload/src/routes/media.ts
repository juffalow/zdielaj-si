import express from 'express';
import container from '../container';
import onlyServer from '../middlewares/onlyServer';

const router = express.Router();

router.get('/:id', onlyServer, async (req: express.Request, res: express.Response) => {
  const mediaRepository: MediaRepository = container.get('repository.media');
  const thumbnailRepository: ThumbnailRepository = container.get('repository.thumbnail');

  const storage: Services.Storage = container.get('service.storage');

  const media = await mediaRepository.get(req.params.id);
  const thumbnails = await thumbnailRepository.getAll(req.params.id);

  const location = storage.getUrl(media.path);

  const thumbnailsWithLocation = thumbnails.map(thumbnail => ({
    ...thumbnail,
    location: storage.getUrl(thumbnail.path),
  }));

  res.status(200).json({
    error: null,
    data: {
      media: {
        ...media,
        location,
        thumbnails: thumbnailsWithLocation,
      },
    },
  }).end();
});

export default router;
