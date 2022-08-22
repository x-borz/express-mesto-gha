require('dotenv').config();

const { PORT = 3000, NODE_ENV, JWT_SECRET: jwt } = process.env;

const CAST_ERROR = 'CastError';
const VALIDATION_ERROR = 'ValidationError';
const NOT_FOUND_ERROR = 'NotFoundError';
const MONGO_SERVER_ERROR = 'MongoServerError';

const JWT_SECRET = NODE_ENV === 'production' ? jwt : 'dev-secret';

const LINK_PATTERN = /^https?:\/\/(w{3}\.)?[a-z\d-]+\.[a-z]{2,3}[a-z\d\-._~:?#@!$&'()*+,;=[\]/]+#?$/;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  PORT,
  CAST_ERROR,
  NOT_FOUND_ERROR,
  VALIDATION_ERROR,
  MONGO_SERVER_ERROR,
  LINK_PATTERN,
};
