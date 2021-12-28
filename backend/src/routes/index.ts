import express from 'express';
import upload from './upload';
import album from './album';
import register from './register';
import login from './login';
import refreshToken from './refreshToken';

const router = express.Router();

router.use('/', upload);
router.use('/album', album);
router.use('/user', register);
router.use('/user', login);
router.use('/user', refreshToken);

export default router;
