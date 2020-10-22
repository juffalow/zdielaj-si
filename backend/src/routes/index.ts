import express from 'express';
import upload from './upload';
import album from './album';

const router = express.Router();

router.use('/', upload);
router.use('/album', album);

export default router;
