const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { sendNotFoundResponse } = require('./controllers/404');
const { login, createUser } = require('./controllers/users');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

// временный миддлвер для авторизации пользовател
app.use((req, res, next) => {
  req.user = {
    _id: '62f0d12ee1597a9e207d36fb',
  };

  next();
});

app.use('/users', require('./routes/user-router'));
app.use('/cards', require('./routes/card-router'));

app.use('*', sendNotFoundResponse);

app.listen(PORT);
