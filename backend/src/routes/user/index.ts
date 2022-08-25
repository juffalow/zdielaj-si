import express from 'express';
import register from './register';
import login from './login';
import emailValidation from './emailValidation';
import deleteUser from './deleteUser';
import logout from './logout';
import refreshToken from './refreshToken';

const router = express.Router();

router.get('/emailValidation', emailValidation);
router.get('/logout', logout);
router.get('/refreshToken', refreshToken);
router.post('/register', register);
router.post('/login', login);
router.delete('/', deleteUser);

export default router;
