module.exports.getValidationMessage = (validError) => {
  const { errors } = validError;
  return Object.keys(errors).map((item) => errors[item].message).join('; ');
};
