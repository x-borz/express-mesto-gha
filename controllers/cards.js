const Card = require('../models/card');
const { NOT_FOUND_CODE, BAD_REQUEST_CODE, DEFAULT_ERROR_CODE } = require('../utils/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then(cards => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
}

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => card.populate('owner'))
    .then(card => res.send(card))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_CODE).send({ message: 'Данные в запросе невалидны' });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
}

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.userId)
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
}

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then(card => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемая карточка не найдена'});
      }
    })
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
}

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then(card => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемая карточка не найдена'});
      }
    })
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  addLike,
  removeLike
}
