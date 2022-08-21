const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
};
