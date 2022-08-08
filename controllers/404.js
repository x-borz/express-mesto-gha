const { NOT_FOUND_CODE } = require('../utils/constants');

module.exports.sendNotFoundResponse = (req, res) => res.status(NOT_FOUND_CODE).send({ message: 'Запрашиваемая ресурс не существет' });
