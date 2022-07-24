import express from 'express';
import upload from './upload';
import media from './media';

const router = express.Router();

router.use('/upload', upload);
router.use('/media', media);

export default router;
