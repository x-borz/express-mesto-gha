const { LINK_PATTERN } = require('./constants');

module.exports.getValidationMessage = (validError) => {
  const { errors } = validError;
  return Object.keys(errors).map((item) => errors[item].message).join('; ');
};

module.exports.isLinkValid = (str) => {
  LINK_PATTERN.test(str);
};
