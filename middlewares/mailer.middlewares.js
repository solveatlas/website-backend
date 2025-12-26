const validator = require("validator");

const verifyEmail = (email) => {
  return validator.isEmail(email);
};

module.exports = verifyEmail;
