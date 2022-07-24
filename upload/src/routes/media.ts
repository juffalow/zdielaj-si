import express from 'express';
import MediaRepository from '../repositories/KnexMediaRepository';
import S3Storage from '../storage/S3Storage';
import onlyServer from '../middlewares/onlyServer';

const router = express.Router();

router.get('/:id', onlyServer, async (req: express.Request, res: express.Response) => {
  const mediaRepository = new MediaRepository();
  const storage = new S3Storage();
  const media = await mediaRepository.get(req.params.id);
  const location = storage.getUrl(media.path);

  res.status(200).json({
    error: null,
    data: {
      media: {
        ...media,
        location,
      },
    },
  }).end();
});

export default router;
