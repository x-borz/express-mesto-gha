const User = require('../models/user');
const { NOT_FOUND_CODE, BAD_REQUEST_CODE, DEFAULT_ERROR_CODE } = require('../utils/constants');

const getAllUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const getUserById = (req, res) => {
  console.log(req.params);
  User.findById(req.params.userId)
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемый пользователь не найден'});
      }
    })
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Данные в запросе невалидны' });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
  }

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(NOT_FOUND_CODE).send({message: 'Запрашиваемый пользователь не найден'});
      }
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Данные в запросе невалидны' });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar}, {new: true, runValidators: true})
    . then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(NOT_FOUND_CODE).send({message: 'Запрашиваемый пользователь не найден'});
      }
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Данные в запросе невалидны' });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
}
