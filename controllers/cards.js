const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.userId)
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  addLike,
  removeLike
}
