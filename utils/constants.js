const { NODE_ENV, JWT_SECRET: jwt } = process.env;

const NOT_FOUND_CODE = 404;
const BAD_REQUEST_CODE = 400;
const DEFAULT_ERROR_CODE = 500;

const JWT_SECRET = NODE_ENV === 'production' ? jwt : 'dev-secret';

module.exports = {
  NOT_FOUND_CODE, BAD_REQUEST_CODE, DEFAULT_ERROR_CODE, NODE_ENV, JWT_SECRET,
};
