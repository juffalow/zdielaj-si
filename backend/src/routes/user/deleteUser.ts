import { Request, Response } from 'express';
import {
  User as UserRepository,
} from '../../repositories';

const deleteUser = async (req: Request, res: Response) => {
  const userRepository = UserRepository;
  const user = await userRepository.detele((req as any).user.id);

  if (typeof user === 'undefined') {
    return res.status(400).json({
      error: {
        message: 'Unable to delete user!',
        code: 2,
      },
      data: null,
    }).end();
  }

  res.status(200).json({
    error: null,
    data: { 
      user,
    },
  }).end();
};

export default deleteUser;
