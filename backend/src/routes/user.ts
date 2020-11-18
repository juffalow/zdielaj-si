import express from 'express';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/KnexUserRepository';
import { generateToken } from '../utils/functions';

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

  let user = null;

  try {
    const userRepository = new UserRepository();
    user = await userRepository.create(data.name, data.email, data.password);
  } catch (err) {
    console.error(err);
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

  const userRepository = new UserRepository();
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

  res.json({
    error: null,
    data: {
      user: {
        id: user.id,
        name: user.name,
        token: generateToken({ id: user.id, email: user.email }),
      },
    },
  });
});

export default router;
