import express from 'express';
import requireAuth from '../middlewares/requireAuth';
import controllers from '../controllers';

const router = express.Router();

router.get('/:id', requireAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const user = await controllers.Users.get(req.params.id);
    
    res.status(200).json({
      error: null,
      data: {
        user,
      }
    }).end();
  } catch (err) {
    next(err);
  }
});

export default router;
