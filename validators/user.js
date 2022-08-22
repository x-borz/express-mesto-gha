const { celebrate, Joi } = require('celebrate');
const { LINK_PATTERN } = require('../utils/constants');

const validSigninRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validSignupRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(LINK_PATTERN),
  }),
});

const validUpdateUserRequest = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validUpdateAvatarRequest = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(LINK_PATTERN),
  }),
});

const validGetUserRequest = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validSigninRequest,
  validSignupRequest,
  validUpdateUserRequest,
  validUpdateAvatarRequest,
  validGetUserRequest,
};
