const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { sendNotFoundResponse } = require('./controllers/404');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { PORT, LINK_PATTERN } = require('./utils/constants');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(LINK_PATTERN),
  }),
}), createUser);

app.use(cookieParser());
app.use(auth);

app.use('/users', require('./routes/user-router'));
app.use('/cards', require('./routes/card-router'));

app.use('*', sendNotFoundResponse);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
