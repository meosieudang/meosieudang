const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfile(data) {
  const errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.create_date = !isEmpty(data.create_date) ? data.create_date : "";

  if (Validator.isEmpty(data.handle)) errors.handle = "This field is required";
  if (Validator.isEmpty(data.create_date))
    errors.create_date = "This field is required";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
