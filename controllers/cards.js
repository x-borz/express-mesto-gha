const Card = require('../models/card');
const { CAST_ERROR, VALIDATION_ERROR } = require('../utils/constants');
const { getValidationMessage } = require('../utils/utils');
const BadRequestError = require('../errors/bad-request-error');
const NoRightsError = require('../errors/no-rights-error');
const NotFoundError = require('../errors/not-found-error');

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(`Данные в запросе невалидны: ${getValidationMessage(err)}`));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { _id: myId } = req.user;

  Card.findById(req.params.cardId)
    .populate('owner')
    .then((card) => {
      if (card) {
        if (myId === card.owner._id.toString()) {
          return card;
        }

        throw new NoRightsError('Можно удалять лишь свои карточки');
      }

      throw new NotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((card) => Card.deleteOne({ _id: card._id }))
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError('Идентификатор запрашиваемой карточки в параметрах запроса невалиден'));
      } else {
        next(err);
      }
    });
};

const addLike = (req, res, next) => {
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
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError('Идентификатор запрашиваемой карточки в параметрах запроса невалиден'));
      } else {
        next(err);
      }
    });
};

const removeLike = (req, res, next) => {
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
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError('Идентификатор запрашиваемой карточки в параметрах запроса невалиден'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getAllCards, createCard, deleteCard, addLike, removeLike,
};
