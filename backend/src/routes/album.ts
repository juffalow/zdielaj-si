import express from 'express';
import repositories from '../repositories';
import { generateToken } from '../utils/functions';
import requireAuth from '../middlewares/requireAuth';
import optionalAlbum from '../middlewares/optionalAlbum';
import controllers from '../controllers';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const album = await controllers.Album.getAlbum(req.params.id);
    
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

router.get('/', requireAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const albums = await controllers.Album.getAlbums(req['user']);
    
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

router.post('/', async (req: express.Request, res: express.Response) => {
  const album = await controllers.Album.createAlbum(req['user']);

  res.status(200).json({
    error: null,
    data: {
      album,
      user: {
        token: generateToken({ albumId: album.id }),
      },
    },
  }).end();
});

router.post('/:id/media', optionalAlbum, async (req: express.Request, res: express.Response) => {
  const albumRepository = repositories.Album;
  const mediaRepository = repositories.Media;

  const user: User | { albumId: number } = 'album' in req ? req['album'] as { albumId: number } : 'user' in req ? req['user'] as User : null;

  const album = await albumRepository.get(parseInt(req.params.id));
  const count = await mediaRepository.count({ album: { id: req.params.id } });

  if (album === null || typeof album === 'undefined') {
    return res.status(400).json({
      error: {
        message: 'Specified album does not exist!',
      },
      data: null,
    }).end();
  }

  if (user !== null && 'id' in user && album.userId !== user.id) {
    return res.status(400).json({
      error: {
        message: 'Specified album does not belong to you!',
      },
      data: null,
    }).end();
  }

  if (user !== null && 'albumId' in user && album.id !== user.albumId) {
    return res.status(400).json({
      error: {
        message: 'Specified album does not belong to you!',
      },
      data: null,
    }).end();
  }

  if (album.userId === null && count >= 10) {
    return res.status(400).json({
      error: {
        message: 'Specified album cannot add additional media!',
      },
      data: null,
    }).end();
  }

  if (album.userId !== null && count >= 50) {
    return res.status(400).json({
      error: {
        message: 'Specified album cannot add additional media!',
      },
      data: null,
    }).end();
  }

  await mediaRepository.create(album.id, req.body.fileId);
  const media = await mediaRepository.find({ album: { id: album.id } });

  res.status(200).json({
    error: null,
    data: {
      album: {
        ...album,
        media,
      },
      user: {
        token: generateToken({ albumId: album.id }),
      },
    },
  }).end();
});

router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const album = await controllers.Album.deleteAlbum(parseInt(req.params.id));
    
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

export default router;
