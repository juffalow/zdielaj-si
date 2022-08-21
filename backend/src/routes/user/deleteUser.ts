import { Request, Response } from 'express';
import {
  User as UserRepository,
} from '../../repositories';

export const deleteUser = async (req: Request, res: Response) => {
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
};
