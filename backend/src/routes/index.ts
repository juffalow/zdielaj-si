import express from 'express';
import albums from './albums';
import notifications from './notifications';
import publicProfiles from './publicProfiles';
import usersAlbums from './users/albums';
import publicProfilesAlbums from './publicProfiles/Albums';
import me from './me';
import shortLinks from './shortLinks';

const router = express.Router();

router.use('/albums', albums);
router.use('/notifications', notifications);
router.use('/publicprofiles', publicProfiles);
router.use('/publicprofiles', publicProfilesAlbums);
router.use('/me', me);
router.use('/shortlinks', shortLinks);
router.use('/users', usersAlbums);

export default router;
