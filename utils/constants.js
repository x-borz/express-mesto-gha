require('dotenv').config();

const { PORT = 3000, NODE_ENV, JWT_SECRET: jwt } = process.env;

const BAD_REQUEST_CODE = 400;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

const CAST_ERROR = 'CastError';
const VALIDATION_ERROR = 'ValidationError';
const NO_RIGHTS_TO_REMOVE_ERROR = 'NowRightsToRemoveError';
const NOT_FOUND_ERROR = 'NotFoundError';
const MONGO_SERVER_ERROR = 'MongoServerError';

const JWT_SECRET = NODE_ENV === 'production' ? jwt : 'dev-secret';

module.exports = {
  NOT_FOUND_CODE,
  BAD_REQUEST_CODE,
  DEFAULT_ERROR_CODE,
  FORBIDDEN_CODE,
  NODE_ENV,
  JWT_SECRET,
  PORT,
  CAST_ERROR,
  NO_RIGHTS_TO_REMOVE_ERROR,
  NOT_FOUND_ERROR,
  VALIDATION_ERROR,
  MONGO_SERVER_ERROR
};
