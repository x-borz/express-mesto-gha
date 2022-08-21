const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { sendNotFoundResponse } = require('./controllers/404');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { PORT } = require('./utils/constants');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(cookieParser());
app.use(auth);

app.use('/users', require('./routes/user-router'));
app.use('/cards', require('./routes/card-router'));

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.use('*', sendNotFoundResponse);

app.listen(PORT);
