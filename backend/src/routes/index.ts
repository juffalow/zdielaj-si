import express from 'express';
import album from './album';
import user from './user';

const router = express.Router();

router.use('/album', album);
router.use('/user', user);

export default router;
