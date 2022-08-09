const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'не заполнено обязательное поле "Имя"'],
      minlength: [2, 'длина поля "Имя" должно быть не менее {VALUE} символов'],
      maxlength: [30, 'длина поля "Имя" должна быть не более {VALUE} символов'],
    },
    about: {
      type: String,
      required: [true, 'не заполнено обязательное поле "О Себе"'],
      minlength: [2, 'длина поля "О себе" должно быть не менее {VALUE} символов'],
      maxlength: [30, 'длина поля "О себе" должна быть не более {VALUE} символов'],
    },
    avatar: {
      type: String,
      required: [true, 'не заполнено обязательное поле "Аватар"'],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
