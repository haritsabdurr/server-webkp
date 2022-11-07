import express from 'express';
import { checkDuplicateUsernameOrEmail } from '../middleware/verifySignup.js';
import { signin, signup } from '../controller/auth.controller.js';

const authRouter = express.Router();

authRouter.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

authRouter.post('/auth/signup', checkDuplicateUsernameOrEmail, signup);
authRouter.post('/auth/signin', signin);

export default authRouter;
