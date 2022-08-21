import { Request, Response } from 'express';
import {
  User as UserRepository,
} from '../../repositories';

export const deleteUser = async (req: Request, res: Response) => {
  const user = 'user' in req ? (req as any).user : null;

  if (!user || !('id' in user)) {
    return res.status(400).json({
      error: {
        message: 'Missing authorization token',
        code: 1
      },
      data: null,
    }).end();
  }

  const userRepository = UserRepository;
  const deleteStatus = await userRepository.detele(user.id);

  if (!deleteStatus) {
    return res.status(400).json({
      error: {
        message: 'Can not delete user',
        code: 2,
      },
      data: null,
    }).end();
  }

  res.status(200).json({
    error: null,
    data: true,
  }).end();
};
