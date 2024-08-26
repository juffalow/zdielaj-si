import express from 'express';
import requireAuth from '../middlewares/requireAuth';
import controllers from '../controllers';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const publicProfile = await controllers.PublicProfile.get(req.params.id);
    
    res.status(200).json({
      error: null,
      data: {
        publicProfile,
      }
    }).end();
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const publicProfiles = await controllers.PublicProfile.find(req.query);
    
    res.status(200).json({
      error: null,
      data: {
        publicProfiles,
      }
    }).end();
  } catch (err) {
    next(err);
  }
});

router.post('/', requireAuth, async (req: express.Request, res: express.Response) => {
  console.log('req.body', req.body)
  const publicProfile = await controllers.PublicProfile.create(req.body, req['user']);

  res.status(200).json({
    error: null,
    data: {
      publicProfile,
    },
  }).end();
});

router.delete('/:id', requireAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const publicProfile = await controllers.PublicProfile.delete(req.params.id);
    
    res.status(200).json({
      error: null,
      data: {
        publicProfile,
      }
    }).end();
  } catch (err) {
    next(err);
  }
});

export default router;