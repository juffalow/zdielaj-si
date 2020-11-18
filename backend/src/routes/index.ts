import express from 'express';
import upload from './upload';
import album from './album';
import user from './user';

const router = express.Router();

router.use('/', upload);
router.use('/album', album);
router.use('/user', user);

export default router;
