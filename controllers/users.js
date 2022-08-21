const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NOT_FOUND_CODE,
  BAD_REQUEST_CODE,
  DEFAULT_ERROR_CODE,
  CAST_ERROR,
  VALIDATION_ERROR, MONGO_SERVER_ERROR,
} = require('../utils/constants');
const { getValidationMessage } = require('../utils/utils');
const { JWT_SECRET } = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((err) => {
      let error = '';
      if (err.name === CAST_ERROR) {
        error = new BadRequestError('Идентификатор пользователя в параметрах запроса невалиден');
      }
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      let error;
      if (err.name === VALIDATION_ERROR) {
        error = new BadRequestError(`Данные в запросе невалидны: ${getValidationMessage(err)}`);
      } else if (err.name === MONGO_SERVER_ERROR && err.code === 11000) {
        error = new ConflictError('На сайте уже зарегистрирован пользователь с указанным в запросе email');
      }
      next(error);
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        res.status(BAD_REQUEST_CODE).send({ message: `Данные в запросе невалидны: ${getValidationMessage(err)}` });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        res.status(BAD_REQUEST_CODE).send({ message: `Данные в запросе невалидны: ${getValidationMessage(err)}` });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => next(err));
};

const getUser = (req, res) => {
  const { _id } = req.user;

  return User.findById(_id)
    .then((user) => res.send(user))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getAllUsers, getUserById, createUser, updateUser, updateAvatar, login, getUser,
};
