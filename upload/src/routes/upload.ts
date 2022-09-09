import express from 'express';
import multer from 'multer';
import {
  fileFilter,
} from '../utils/functions';
import container from '../container';
import UploadController from '../controllers/Upload';

const upload = multer({ fileFilter });

const router = express.Router();

router.post('/', upload.single('image'), async (req: express.Request, res: express.Response) => {
  const uploadController = container.get<UploadController>('controller.upload');

  return uploadController.process(req, res);
});

export default router;
