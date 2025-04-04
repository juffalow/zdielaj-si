import express from 'express';
import albums from './albums';
import notifications from './notifications';
import publicProfiles from './publicProfiles';
import meAlbums from './me/albums';
import publicProfilesAlbums from './publicProfiles/Albums';
import me from './me';
import shortLinks from './shortLinks';

const router = express.Router();

router.use('/albums', albums);
router.use('/notifications', notifications);
router.use('/publicprofiles', publicProfiles);
router.use('/publicprofiles', publicProfilesAlbums);
router.use('/me', me);
router.use('/me', meAlbums);
router.use('/shortlinks', shortLinks);

export default router;
