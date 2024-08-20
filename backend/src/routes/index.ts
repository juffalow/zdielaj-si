import express from 'express';
import album from './album';
import notifications from './notifications';
import publicProfile from './publicProfile';
import publicProfilesAlbums from './publicProfiles/Albums';

const router = express.Router();

router.use('/album', album);
router.use('/albums', album);
router.use('/notifications', notifications);
router.use('/publicprofile', publicProfile);
router.use('/publicprofiles', publicProfilesAlbums);

export default router;
