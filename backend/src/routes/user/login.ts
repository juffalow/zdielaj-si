import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import config from '../../config';
import repositories from '../../repositories';
import { generateToken } from '../../utils/functions';
import services from '../../services';
import logger from '../../logger';

const login = async (req: Request, res: Response) => {
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

  const userRepository = repositories.User;
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

  logger.debug('Notifying user about login from new device!');
  await services.Notifications.notify({
    name: 'login',
    parameters: {
      email: user.email,
      firstName: user.name,
    },
  });

  const refreshTokenRepository = repositories.RefreshToken;

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
