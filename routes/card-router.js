const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

const cardIdRule = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

cardRouter.get('/', getAllCards);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(8),
    link: Joi.string().required().uri({
      scheme: ['http', 'https'],
      allowRelative: false,
      relativeOnly: false,
    }),
  }),
}), createCard);

cardRouter.delete('/:cardId', cardIdRule, deleteCard);

cardRouter.put('/:cardId/likes', cardIdRule, addLike);

cardRouter.delete('/:cardId/likes', cardIdRule, removeLike);

module.exports = cardRouter;
