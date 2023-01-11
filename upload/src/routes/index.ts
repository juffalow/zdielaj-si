import express from 'express';
import upload from './upload';
import files from './files';

const router = express.Router();

router.use('/upload/files', upload);
router.use('/upload/files', files);

export default router;
