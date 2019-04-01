const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfile(data) {
  const errors = {};
  const arr = data.licensePlates.split("");
  data.price = !isEmpty(data.price) ? data.price : "";
  data.start = !isEmpty(data.start) ? data.start : "";
  data.end = !isEmpty(data.end) ? data.end : "";
  if (!Validator.isNumeric(data.price)) errors.price = "Chỉ được nhập số";

  if (arr[9] === " ") errors.licensePlates = "Vui lòng nhập đúng biển số xe";

  if (Validator.isEmpty(data.licensePlates))
    errors.licensePlates = "Không để trống ô này";
  if (Validator.isEmpty(data.start)) errors.start = "Không để trống ô này";
  if (Validator.isEmpty(data.end)) errors.end = "Không để trống ô này";
  if (Validator.isEmpty(data.price)) errors.price = "Không để trống ô này";
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
