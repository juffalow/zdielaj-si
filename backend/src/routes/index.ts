import express from 'express';
import upload from './upload';
import album from './album';
import register from './register';
import login from './login';
import logout from './logout';
import refreshToken from './refreshToken';
import emailValidation from './emailValidation';

const router = express.Router();

router.use('/', upload);
router.use('/album', album);
router.use('/user', register);
router.use('/user', login);
router.use('/user', logout);
router.use('/user', refreshToken);
router.use('/user', emailValidation);

export default router;
