const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// временный миддлвер для авторизации пользовател
app.use((req, res, next) => {
  req.user = {
    _id: '62f0d12ee1597a9e207d36fb',
  };

  next();
});

app.use('/users', require('./routes/user-router'));
app.use('/cards', require('./routes/card-router'));

app.listen(PORT);
