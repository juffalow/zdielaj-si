import express from 'express';
import {
  Album as AlbumRepository,
  Media as MediaRepository,
} from '../repositories';
import { generateToken } from '../utils/functions';
import { getMedia } from '../services/upload';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response) => {
  const albumRepository = AlbumRepository;
  const mediaRepository = MediaRepository;

  const album = await albumRepository.get(req.params.id);
  const media = await mediaRepository.find(req.params.id);

  if (typeof media === 'undefined' || media.length === 0) {
    res.status(404).json({
      error: 'Album not found!',
      data: null,
    }).end();
    return;
  }

  const fullMedia = await Promise.all(media.map(async (single) => {
    const response = await getMedia(single.mediaId);

    return {
      ...single,
      mimetype: response.data.media.mimetype,
      size: response.data.media.size,
      location: response.data.media.location,
      thumbnails: response.data.media.thumbnails,
    }
  }));

  res.status(200).json({
    error: null,
    data: {
      album: {
        ...album,
        media: fullMedia,
      },
    }
  }).end();
});

router.post('/', async (req: express.Request, res: express.Response) => {
  const albumRepository = AlbumRepository;
  const userId = 'user' in req ? (req as any).user.id : null;

  const album = await albumRepository.create(userId);

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
  const albumRepository = AlbumRepository;
  const mediaRepository = MediaRepository;
  const user = 'user' in req ? (req as any).user : null;
  const album = await albumRepository.get(req.params.id);
  const count = await mediaRepository.count(req.params.id);

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

  await mediaRepository.create(album.id, req.body.mediaId);
  const media = await mediaRepository.find(album.id);

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
