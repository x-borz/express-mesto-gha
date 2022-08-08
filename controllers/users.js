const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const getUserById = (req, res) => {
  console.log(req.params);
  User.findById(req.params.userId)
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const updateUser = (req, res) => {

}

const updateAvatar = (req, res) => {

}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
}
