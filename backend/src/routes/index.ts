import express from 'express';
import album from './album';
import notifications from './notifications';

const router = express.Router();

router.use('/album', album);
router.use('/albums', album);
router.use('/notifications', notifications);

export default router;
