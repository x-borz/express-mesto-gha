const router = require('express').Router();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { sendNotFoundResponse } = require('../controllers/404');
const errorHandler = require('../middlewares/error-handler');
const { validSigninRequest, validSignupRequest } = require('../validators/user');

router.use(helmet());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/signin', validSigninRequest, login);
router.post('/signup', validSignupRequest, createUser);
router.get('/signout', (req, res) => res.clearCookie('jwt').send({ message: 'Выход' }));

router.use(cookieParser());
router.use(auth);

router.use('/users', require('./user-router'));
router.use('/cards', require('./card-router'));

router.use('*', sendNotFoundResponse);

router.use(errors());

router.use(errorHandler);

module.exports = router;
