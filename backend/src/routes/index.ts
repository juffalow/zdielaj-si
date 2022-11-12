import express from 'express';
import album from './album';
import user from './user';
import notifications from './notifications';

const router = express.Router();

router.use('/album', album);
router.use('/user', user);
router.use('/notifications', notifications);

export default router;
