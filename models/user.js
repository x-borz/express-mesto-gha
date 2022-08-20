const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
      unique: true,
      validate: [isEmail, 'в поле {PATH} указан невалидный адрес электронной почты'],
    },
    password: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
      minlength: [8, 'длина поля {PATH} должна быть не менее 8 символов'],
    },
    name: {
      type: String,
      minlength: [2, 'длина поля {PATH} должна быть не менее 2 символов'],
      maxlength: [30, 'длина поля {PATH} должна быть не более 30 символов'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'длина поля {PATH} должно быть не менее 2 символов'],
      maxlength: [30, 'длина поля {PATH} должна быть не более 30 символов'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
