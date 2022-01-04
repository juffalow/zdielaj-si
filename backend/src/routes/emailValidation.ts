import express from 'express';
import UserRepository from '../repositories/KnexUserRepository';

const router = express.Router();

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

  const userRepository = new UserRepository();
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

export default router;
