import express from 'express';
import RefreshTokenRepository from '../repositories/KnexRefreshTokenRepository';

const router = express.Router();

router.get('/logout', async (req, res) => {
  if (!('refreshToken' in req.cookies) || req.cookies.refreshToken.indexOf('.') === -1) {
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

  const refreshTokenRepository = new RefreshTokenRepository();
  const [ userId, userRefreshToken ] = req.cookies.refreshToken.split('.');
  const refreshToken = await refreshTokenRepository.get(userId, userRefreshToken);

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

  await refreshTokenRepository.delete(refreshToken.userId, refreshToken.token);

  res.clearCookie('refreshToken');

  res.json({
    error: null,
    data: null,
  });
});

export default router;
