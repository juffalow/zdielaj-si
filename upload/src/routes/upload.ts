import express from 'express';
import multer from 'multer';
import {
  fileFilter,
} from '../utils/functions';
import controllers from '../controllers';

const upload = multer({ fileFilter });

const router = express.Router();

router.post('/', upload.single('image'), async (req: express.Request, res: express.Response) => {
  const uploadController = controllers.Upload;

  return uploadController.process(req, res);
});

export default router;
