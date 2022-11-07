import express from 'express';
import { verifyToken } from '../middleware/authJwt.js';
import {
  getUsers,
  getUserById,
  saveUser,
  updateUser,
  deleteUser,
} from '../controller/user.controller.js';

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.get('/auth/users', verifyToken, getUsers);
router.get('/auth/users/:id', verifyToken, getUserById);
router.post('/auth/users', verifyToken, saveUser);
router.patch('/auth/users/:id', verifyToken, updateUser);
router.delete('/auth/users/:id', verifyToken, deleteUser);

export default router;
