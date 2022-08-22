module.exports.getValidationMessage = (validError) => {
  const { errors } = validError;
  return Object.keys(errors).map((item) => errors[item].message).join('; ');
};

module.exports.isLinkValid = (str) => {
  /^https?:\/\/(w{3}\.)?[a-z\d-]+\.[a-z]{2,3}[a-z\d\-._~:?#@!$&'()*+,;=[\]/]*#?$/.test(str);
};
