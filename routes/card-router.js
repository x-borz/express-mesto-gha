const cardRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

cardRouter.get('/', getAllCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', addLike);
cardRouter.delete('/:cardId/likes', removeLike);

module.exports = cardRouter;
