import express from 'express';
import controllers from '../../controllers';

const router = express.Router();

router.get('/:publicProfileId/albums', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { albums } = await controllers.publicProfiles.Albums.list(req.params.publicProfileId, 10, 0);
    
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
