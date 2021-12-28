import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';
import RefreshTokenRepository from '../repositories/KnexRefreshTokenRepository';
import { generateToken } from '../utils/functions';

const router = express.Router();

router.get('/refreshToken/:userId', async (req, res) => {
  const refreshTokenRepository = new RefreshTokenRepository();
  const refreshToken = await refreshTokenRepository.get(req.params.userId as unknown as number, req.cookies.refreshToken);

  if(typeof refreshToken === 'undefined') {
    res.status(401);
    res.json({
      error: {
        code: 1,
        message: 'Invalid refresh token!',
      },
      data: null,
    });
    return;
  }

  const token = generateToken({ id: refreshToken.userId });
  const newRefreshToken: string = uuidv4();

  await refreshTokenRepository.delete(refreshToken.userId, refreshToken.token);
  await refreshTokenRepository.create(refreshToken.userId, newRefreshToken, 7 * 24 * 60 * 60);

  res.cookie('refreshToken', newRefreshToken, {
    secure: config.env !== 'DEVELOPMENT',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: config.domain,
  });

  res.json({
    error: null,
    data: {
      id: refreshToken.userId,
      token: token,
    },
  });
});

export default router;
