import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';
import {
  User as UserRepository,
  RefreshToken as RefreshTokenRepository,
} from '../repositories';
import { generateToken } from '../utils/functions';
import { notify } from '../services/notifications';

const router = express.Router();

router.post('/register', async (req: express.Request, res: express.Response) => {
  const data = req.body;

  if (!('name' in data) || !('email' in data) || !('password' in data)) {
    return res.status(400).json({
      error: {
        message: 'Missing mandatory fields!',
        code: 1,
      },
      data: null,
    }).end();
  }

  let user: User = null;
  const userRepository = UserRepository;
  const passwordHash = bcrypt.hashSync(data.password, 10);
  const token = uuidv4();

  try {
    user = await userRepository.create({ name: data.name, email: data.email, password: passwordHash, token });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY' || err.sqlMessage.toLowerCase().indexOf('duplicate') > -1) {
      return res.status(400).json({
        error: {
          message: 'Email address already exists!',
          code: 2,
        },
        data: null,
      }).end();
    }
    return res.status(400).json({
      error: {
        message: 'Unable to create user!',
        code: 3,
      },
      data: null,
    }).end();
  }

  await notify({
    name: 'register',
    parameters: {
      firstName: user.name,
      email: user.email,
      validateEmailLink: `${config.services.frontend.url}/validacia?id=${user.id}&token=${token}`,
      unsubscribeUrl: `${config.services.frontend.url}/notifikacie`,
    },
  });

  delete user.password;

  res.status(200).json({
    error: null,
    data: {
      user,
    },
  }).end();
});

router.post('/login', async (req: express.Request, res: express.Response) => {
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
});

router.get('/emailValidation', async (req, res) => {
  console.log(req.query)
  if ('id' in req.query === false || 'token' in req.query === false && parseInt(req.query.id as string) === parseInt(req.query.id as string)) {
    return res.status(401)
      .json({
        error: {
          code: 1,
          message: 'User ID or token is missing!',
        },
        data: null,
      })
      .end();
  }

  const userRepository = UserRepository;
  const user = await userRepository.get(parseInt(req.query.id as string));

  if(typeof user === 'undefined') {
    return res.status(401)
      .json({
        error: {
          code: 1,
          message: 'Invalid email address!',
        },
        data: null,
      })
      .end();
  }

  await userRepository.update({ id: user.id, token: null, isActive: 1 });

  res.json({
    error: null,
    data: null,
  });
});

router.delete('/:id', async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({
      error: {
        message: 'Missing user ID parameter',
        code: 1
      },
      data: null,
    }).end();
  }

  const id = Number.parseInt(req.params.id)
  const userRepository = UserRepository;
  const user = await userRepository.get(id)

  if (!user) {
    return res.status(400).json({
      error: {
        message: 'User was not found',
        code: 2
      },
      data: null,
    }).end();
  }

  const deleteStatus = await userRepository.detele(id);

  if (!deleteStatus) {
    return res.status(400).json({
      error: {
        message: 'Can not delete user',
        code: 3
      },
      data: null,
    }).end();
  }

  res.status(200).json({
    error: null,
    data: true,
  }).end();
});

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

  await refreshTokenRepository.delete(refreshToken.userId, refreshToken.token);

  res.clearCookie('refreshToken');

  res.json({
    error: null,
    data: null,
  });
});

router.get('/refreshToken', async (req, res) => {
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
});

export default router;
