const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'не заполнено обязательное поле "Имя"'],
      minlength: [2, 'длина поля "Имя" должно быть не менее {VALUE} символов'],
      maxlength: [30, 'длина поля "Имя" должна быть не более {VALUE} символов'],
    },
    link: {
      type: String,
      required: [true, 'не заполнено обязательное поле "Ссылка"'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'не заполнено обязательное поле "Автор"'],
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
