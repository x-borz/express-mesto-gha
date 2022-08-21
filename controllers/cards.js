const Card = require('../models/card');
const {
  NOT_FOUND_CODE,
  BAD_REQUEST_CODE,
  DEFAULT_ERROR_CODE,
  FORBIDDEN_CODE,
  NO_RIGHTS_TO_REMOVE_ERROR,
  NOT_FOUND_ERROR,
  CAST_ERROR,
  VALIDATION_ERROR,
} = require('../utils/constants');
const { getValidationMessage } = require('../utils/utils');

const getAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        res.status(BAD_REQUEST_CODE).send({ message: `Данные в запросе невалидны: ${getValidationMessage(err)}` });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  const { _id: myId } = req.user;

  Card.findById(req.params.cardId)
    .populate('owner')
    .then((card) => {
      if (card) {
        if (myId === card.owner._id.toString()) {
          return card;
        }

        const err = new Error('Можно удалять лишь свои карточки');
        err.name = NO_RIGHTS_TO_REMOVE_ERROR;
        return Promise.reject(err);
      }

      const err = new Error('Запрашиваемая карточка не найдена');
      err.name = NOT_FOUND_ERROR;
      return Promise.reject(err);
    })
    .then((card) => Card.deleteOne({ _id: card._id }))
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        res.status(BAD_REQUEST_CODE).send({ message: 'Идентификатор удаляемой карточки в параметрах запроса невалиден' });
        return;
      }
      if (err.name === NO_RIGHTS_TO_REMOVE_ERROR) {
        res.status(FORBIDDEN_CODE).send({ message: err.message });
        return;
      }
      if (err.name === NOT_FOUND_ERROR) {
        res.status(NOT_FOUND_CODE).send({ message: err.message });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        res.status(BAD_REQUEST_CODE).send({ message: 'Данные в запросе невалидны' });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемая карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        res.status(BAD_REQUEST_CODE).send({ message: 'Данные в запросе невалидны' });
        return;
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getAllCards, createCard, deleteCard, addLike, removeLike,
};
