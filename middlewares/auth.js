const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
