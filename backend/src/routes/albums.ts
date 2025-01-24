import express from 'express';
import repositories from '../repositories';
import { generateToken } from '../utils/functions';
import requireAuth from '../middlewares/requireAuth';
import optionalAlbum from '../middlewares/optionalAlbum';
import controllers from '../controllers';
import APIError from '../errors/APIError';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    let id = req.params.id;

    if (id.length !== 36) {
      const hex = Buffer.from(id, 'base64url').toString('hex');
      id = `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20)}`;
    }

    const album = await controllers.Albums.getAlbum(id);
    
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

router.post('/', async (req: express.Request, res: express.Response) => {
  const album = await controllers.Albums.createAlbum(req['user']);

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
  const user: User | { albumId: number } = 'album' in req ? req['album'] as { albumId: number } : 'user' in req ? req['user'] as User : null;

  const album = await repositories.Album.get(req.params.id);

  if (album === null || typeof album === 'undefined') {
    throw new APIError({ message: 'Specified album does not exist!', code: 400, http: { status: 400 } });
  }

  if (user !== null && 'id' in user && album.user.id !== user.id) {
    throw new APIError({ message: 'Specified album does not belong to you!', code: 400, http: { status: 400 } });
  }

  // if (user !== null && 'albumId' in user && album.id !== user.albumId) {
  //   throw new APIError({ message: 'Specified album does not belong to you!', code: 400, http: { status: 400 } });
  // }

  if (album.user === null && album.files.length >= 10) {
    throw new APIError({ message: 'Specified album cannot add additional media!', code: 400, http: { status: 400 } });
  }

  if (album.user !== null && album.files.length >= 50) {
    throw new APIError({ message: 'Specified album cannot add additional media!', code: 400, http: { status: 400 } });
  }

  const files = [ ...album.files, req.body.fileId ];

  const updatedAlbum = await repositories.Album.update({ files }, { id: album.id });

  res.status(200).json({
    error: null,
    data: {
      album: updatedAlbum,
      user: {
        token: generateToken({ albumId: album.id }),
      },
    },
  }).end();
});

router.delete('/:id', requireAuth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const album = await controllers.Albums.deleteAlbum(req.params.id, req['user']);
    
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
