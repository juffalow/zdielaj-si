import express from 'express';
import multer from 'multer';
import {
  fileFilter,
} from '../utils/functions';
import controllers from '../controllers';

const upload = multer({ fileFilter }).single('image');

const router = express.Router();

// >>>>>>>>>>> MULTER ISSUE WITH CLS-HOOKED <<<<<<<<<<<<<<
/**
 * Multer is not calling next() function, so it breaks
 * cls-hooked context. Workaround is to wrap multer
 * in promise.
 * 
 * @see https://theekshanawj.medium.com/nodejs-using-multer-and-cls-hooked-together-a00decbebab6
 * @see https://github.com/expressjs/multer/issues/814
 * @see https://github.com/expressjs/multer/issues/1046
 */
const multerPromise = (req: express.Request, res: express.Response) => {
  return new Promise<void>((resolve, reject) => {
    upload(req, res, (err) => {
      if(!err) {
        resolve();
      }

      reject(err);
    });
  });
};

const uploadMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await multerPromise(req, res);
    next();
  } catch(e) {
    next(e);
  }
};

// >>>>>>>>>>>>> <<<<<<<<<<<<<

router.post('/', uploadMiddleware,(req: express.Request, res: express.Response) => {
  const uploadController = controllers.Upload;

  return uploadController.process(req, res);
});

export default router;
