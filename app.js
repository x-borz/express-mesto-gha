const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(bodyParser.json());

//временный миддлвер для авторизации пользовател
app.use((req, res, next) => {
  req.user = {
    _id: '62f0d12ee1597a9e207d36fb'
  };

  next();
});

app.use('/users', require('./routes/user-router'));
app.use('/cards', require('./routes/card-router'));

app.listen(3000, () => {
  console.log(`Server listening on port ${PORT}`);
});
