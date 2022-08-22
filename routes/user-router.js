const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, getUserById, updateUser, updateAvatar, getUser,
} = require('../controllers/users');
const { LINK_PATTERN } = require('../utils/constants');

userRouter.get('/', getAllUsers);

userRouter.get('/me', getUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(LINK_PATTERN),
  }),
}), updateAvatar);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

module.exports = userRouter;
