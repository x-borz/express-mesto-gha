const { celebrate, Joi } = require('celebrate');
const { LINK_PATTERN } = require('../utils/constants');

const validCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const validCreateCardRequest = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(8),
    link: Joi.string().required().pattern(LINK_PATTERN),
  }),
});

module.exports = {
  validCardId,
  validCreateCardRequest,
};
