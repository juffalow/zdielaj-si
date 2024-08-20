import express from 'express';
import controllers from '../../controllers';

const router = express.Router();

router.get('/:publicProfileId/albums/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const album = await controllers.Albums.getAlbum(req.params.id);

    if (album.publicProfileId != req.params.publicProfileId) {
      throw new Error('Album not found');
    }
    
    res.status(200).json({
      error: null,
      data: {
        album,
      }
    }).end();
  } catch (err) {
    next(err);
  }
});

router.get('/:publicProfileId/albums', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const albums = await controllers.Albums.getAlbums({
      publicProfile: {
        id: req.params.publicProfileId,
      } as PublicProfile,
      ...req.query,
    });
    
    res.status(200).json({
      error: null,
      data: {
        albums,
      }
    }).end();
  } catch (err) {
    next(err);
  }
});

export default router;
