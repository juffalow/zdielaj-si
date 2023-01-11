import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import config from '../../config';
import repositories from '../../repositories';
import services from '../../services';

const register = async (req: Request, res: Response) => {
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
  const userRepository = repositories.User;
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

  await services.Notifications.notify({
    name: 'register',
    parameters: {
      firstName: user.name,
      email: user.email,
      validateEmailLink: `${config.services.frontend.url}/validacia?id=${user.id}&token=${token}`,
    },
  });

  delete user.password;

  res.status(200).json({
    error: null,
    data: {
      user,
    },
  }).end();
};

export default register;
