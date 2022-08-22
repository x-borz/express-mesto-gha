const userRouter = require('express').Router();
const {
  getAllUsers, getUserById, updateUser, updateAvatar, getUser,
} = require('../controllers/users');
const { validUpdateUserRequest, validUpdateAvatarRequest, validGetUserRequest } = require('../validators/user');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getUser);
userRouter.patch('/me', validUpdateUserRequest, updateUser);
userRouter.patch('/me/avatar', validUpdateAvatarRequest, updateAvatar);
userRouter.get('/:userId', validGetUserRequest, getUserById);

module.exports = userRouter;
