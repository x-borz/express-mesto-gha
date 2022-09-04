const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT } = require('./utils/constants');
const errorHandler = require('./middlewares/error-handler');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(auth);

app.use(requestLogger);

app.use('/', require('./routes'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
