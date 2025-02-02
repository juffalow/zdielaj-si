import express from 'express';
import repositories from '../repositories';

const router = express.Router();

router.get('/:path', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const shortLink = await repositories.ShortLink.get(req.params.path);
    
    res.status(200).json({
      error: null,
      data: {
        shortLink,
      }
    }).end();

    next();
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const album = await repositories.Album.get(req.body.albumId);

  if (typeof album === 'undefined') {
    throw new Error('Album not found');
  }

  let shortLink = null;
  if (typeof album.shortLink === 'object') {
    shortLink = await repositories.ShortLink.get(album.shortLink.path);
  } else {
    shortLink = await repositories.ShortLink.create({ path: (Math.random() * 0.001).toString(36).slice(-6), albumId: req.body.albumId });
    repositories.Album.update({ shortLink: { path: shortLink.path } }, { id: album.id });
  }

  res.status(200).json({
    error: null,
    data: {
      shortLink,
    },
  }).end();

  next();
});

export default router;
