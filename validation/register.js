const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegister(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.name, { min: 2, max: 20 }))
    errors.name = "Name must beetween 2 - 30";

  // if (!Validator.isEmail(data.email)) errors.email = "Email invalid";
  if (!Validator.isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password a least is must 6 characters";
  if (Validator.isEmpty(data.name)) errors.name = "Name field is required";
  if (Validator.isEmpty(data.email)) errors.email = "Email field is required";
  if (Validator.isEmpty(data.password))
    errors.password = "Password field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
