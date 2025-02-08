import express from 'express';
import controllers from '../../controllers';
import requireAuth from '../../middlewares/requireAuth';

const router = express.Router();

router.get('/:id/albums', requireAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const first = req.query.first ? parseInt(req.query.first as string) : 10;
    const after = req.query.after ? parseInt(req.query.after as string) : 0;
    const { albums } = await controllers.users.Albums.list(req['user'], first, after);
    
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
