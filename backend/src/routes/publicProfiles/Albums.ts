import express from 'express';
import controllers from '../../controllers';
import requireAuth from '../../middlewares/requireAuth';

const router = express.Router();

router.get('/:publicProfileId/albums', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const first = req.query.first ? parseInt(req.query.first as string) : 10;
    const after = req.query.after ? parseInt(req.query.after as string) : 0;
    const { albums } = await controllers.publicProfiles.Albums.list(req.params.publicProfileId, first, after);
    
    res.status(200).json({
      error: null,
      data: {
        albums,
      }
    }).end();

    next();
  } catch (err) {
    next(err);
  }
});

router.post('/:publicProfileId/albums', requireAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await controllers.publicProfiles.Albums.add(req['user'], req.params.publicProfileId, req.body.id);
    
    res.status(204).end();

    next();
  } catch (err) {
    next(err);
  }
});

router.delete('/:publicProfileId/albums/:id', requireAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await controllers.publicProfiles.Albums.remove(req['user'], req.params.publicProfileId, req.params.id);
    
    res.status(204).end();

    next();
  } catch (err) {
    next(err);
  }
});

export default router;
