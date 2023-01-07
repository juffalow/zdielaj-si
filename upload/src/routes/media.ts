import express from 'express';
import repositories from '../repositories';
import services from '../services';
import onlyServer from '../middlewares/onlyServer';

const router = express.Router();

router.get('/:id', onlyServer, async (req: express.Request, res: express.Response) => {
  const mediaRepository: MediaRepository = repositories.Media;
  const thumbnailRepository: ThumbnailRepository = repositories.Thumbnail;

  const storage: Services.Storage = services.Storage;

  const media = await mediaRepository.get(req.params.id);
  const thumbnails = await thumbnailRepository.getAll(req.params.id);

  const location = await storage.getUrl(media.path);

  const thumbnailsWithLocation = await Promise.all(thumbnails.map(async (thumbnail) => ({
    ...thumbnail,
    location: await storage.getUrl(thumbnail.path),
  })));

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
