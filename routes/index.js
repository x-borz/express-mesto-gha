const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { sendNotFoundResponse } = require('../controllers/404');
const { validSigninRequest, validSignupRequest } = require('../validators/user');

router.post('/signin', validSigninRequest, login);
router.post('/signup', validSignupRequest, createUser);
router.get('/signout', (req, res) => res.clearCookie('jwt').send({ message: 'Выход' }));
router.use('/users', require('./user-router'));
router.use('/cards', require('./card-router'));

router.use('*', sendNotFoundResponse);

module.exports = router;
