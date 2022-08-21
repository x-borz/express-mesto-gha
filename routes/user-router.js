const userRouter = require('express').Router();
const {
  getAllUsers, getUserById, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);
userRouter.get('/:userId', getUserById);

module.exports = userRouter;
