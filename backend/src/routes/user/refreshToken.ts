import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import config from '../../config';
import {
  RefreshToken as RefreshTokenRepository,
} from '../../repositories';
import { generateToken } from '../../utils/functions';

const refreshToken = async (req: Request, res: Response) => {
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

  const refreshTokenRepository = RefreshTokenRepository;
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

  const token = generateToken({ id: refreshToken.userId });
  const newRefreshToken: string = uuidv4();

  await refreshTokenRepository.delete(refreshToken.userId, refreshToken.token);
  await refreshTokenRepository.create(refreshToken.userId, newRefreshToken, 7 * 24 * 60 * 60);

  res.cookie('refreshToken', `${refreshToken.userId}.${newRefreshToken}`, {
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
};

export default refreshToken;
