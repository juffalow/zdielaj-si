import express from 'express';
import controllers from '../../controllers';
import requireAuth from '../../middlewares/requireAuth';

const router = express.Router();

router.get('/:id/albums', requireAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { albums } = await controllers.users.Albums.list(req['user'], 10, 0);
    
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

export default router;
