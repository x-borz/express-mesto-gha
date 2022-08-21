const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { sendNotFoundResponse } = require('./controllers/404');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

require('dotenv').config();

const { PORT = 3000 } = process.env;

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

app.use('*', sendNotFoundResponse);

app.listen(PORT);
