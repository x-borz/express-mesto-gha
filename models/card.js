const mongoose = require('mongoose');
const { isLinkValid } = require('../utils/utils');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'не заполнено обязательное поле {PATH}'],
      minlength: [2, 'длина поля {PATH} должна быть не менее 2 символов'],
      maxlength: [30, 'длина поля {PATH} должна быть не более 8 символов'],
    },
    link: {
      type: String,
      required: [true, 'не заполнено обязательное поле {PATH}'],
      validate: [isLinkValid, 'в поле {PATH} указана невалидная ссылка на изображение'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'не заполнено обязательное поле {PATH}'],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
