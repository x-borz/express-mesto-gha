const NotFoundError = require('../errors/not-found-error');

module.exports.sendNotFoundResponse = (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не существует'));
};
