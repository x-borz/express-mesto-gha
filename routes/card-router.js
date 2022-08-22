const cardRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');
const { validCardId, validCreateCardRequest } = require('../validators/card');

cardRouter.get('/', getAllCards);

cardRouter.post('/', validCreateCardRequest, createCard);

cardRouter.delete('/:cardId', validCardId, deleteCard);

cardRouter.put('/:cardId/likes', validCardId, addLike);

cardRouter.delete('/:cardId/likes', validCardId, removeLike);

module.exports = cardRouter;
