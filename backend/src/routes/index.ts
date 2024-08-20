import express from 'express';
import albums from './albums';
import notifications from './notifications';
import publicProfiles from './publicProfiles';
import publicProfilesAlbums from './publicProfiles/Albums';

const router = express.Router();

router.use('/albums', albums);
router.use('/notifications', notifications);
router.use('/publicprofiles', publicProfiles);
router.use('/publicprofiles', publicProfilesAlbums);

export default router;
