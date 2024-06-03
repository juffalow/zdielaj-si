import express from 'express';
import repositories from '../repositories';
import { generateToken } from '../utils/functions';
import requireAuth from '../middlewares/requireAuth';
import controllers from '../controllers';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    let album = null;

    if (isNaN(req.params.id as any)) {
      album = await controllers.Album.getAlbumByHash(req.params.id);
    } else {
      album = await controllers.Album.getAlbum(parseInt(req.params.id));
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

router.post('/:id/media', async (req: express.Request, res: express.Response) => {
  const albumRepository = repositories.Album;
  const mediaRepository = repositories.Media;
  const user = 'user' in req ? (req as any).user : null;
  const album = await albumRepository.get(parseInt(req.params.id));
  const count = await mediaRepository.count({ album: { id: req.params.id } });

  if (user !== null && 'id' in user) {
    if (album.userId !== user.id) {
      return res.status(400).json({
        error: {
          message: 'This album does not belong to you!',
        },
        data: null,
      }).end();
    }
    if (typeof album === 'undefined' || count > 50) {
      return res.status(400).json({
        error: {
          message: 'Album does not exist or album is full!',
        },
        data: null,
      }).end();
    }
  } else if (user !== null && 'albumId' in user) {
    if (album.id !== user.albumId) {
      return res.status(400).json({
        error: {
          message: 'This album does not belong to you!',
        },
        data: null,
      }).end();
    }

    if (typeof album === 'undefined' || count > 10) {
      return res.status(400).json({
        error: {
          message: 'Album does not exist or album is full!',
        },
        data: null,
      }).end();
    }
  } else {
    return res.status(400).json({
      error: {
        message: 'This album does not belong to you!',
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

export default router;
