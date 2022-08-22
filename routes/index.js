const router = require('express').Router();
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { login, createUser } = require('../controllers/users');
const { LINK_PATTERN } = require('../utils/constants');
const auth = require('../middlewares/auth');
const { sendNotFoundResponse } = require('../controllers/404');
const errorHandler = require('../middlewares/error-handler');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(LINK_PATTERN),
  }),
}), createUser);

router.use(cookieParser());
router.use(auth);

router.use('/users', require('./user-router'));
router.use('/cards', require('./card-router'));

router.use('*', sendNotFoundResponse);

router.use(errors());

router.use(errorHandler);

module.exports = router;
