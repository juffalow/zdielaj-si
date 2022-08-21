import { Request, Response } from 'express';
import {
  User as UserRepository,
} from '../../repositories';

export const emailValidation = async (req: Request, res: Response) => {
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
};
