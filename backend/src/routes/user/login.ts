import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import config from '../../config';
import {
  User as UserRepository,
  RefreshToken as RefreshTokenRepository,
} from '../../repositories';
import { generateToken } from '../../utils/functions';

const login = async (req: express.Request, res: express.Response) => {
  const data = req.body;

  if (!('email' in data) || !('password' in data)) {
    return res.status(400).json({
      error: {
        message: 'Missing mandatory fields!',
        code: 1,
      },
      data: null,
    }).end();
  }

  const userRepository = UserRepository;
  const user = await userRepository.getByEmail(data.email);

  const isCorrect = typeof user === 'undefined' || user === null ? false : await bcrypt.compare(data.password, user.password);

  if (!isCorrect) {
    return res.status(400).json({
      error: {
        message: 'Wrong email or password!',
        code: 2,
      },
      data: null,
    }).end();
  }

  const refreshTokenRepository = RefreshTokenRepository;

  const token = generateToken({ id: user.id });
  const refreshToken: string = uuidv4();

  await refreshTokenRepository.create(user.id, refreshToken, 7 * 24 * 60 * 60);

  res.cookie('refreshToken', `${user.id}.${refreshToken}`, {
    secure: config.env !== 'DEVELOPMENT',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: config.domain,
  });

  res.json({
    error: null,
    data: {
      user: {
        id: user.id,
        name: user.name,
        token: token,
      },
    },
  });
};

export default login;
