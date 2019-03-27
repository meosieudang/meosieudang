const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfile(data) {
  const errors = {};

  data.numberSeat = !isEmpty(data.numberSeat) ? data.numberSeat : "";

  if (parseInt(data.numberSeat) < 10)
    errors.numberSeat = "Số ghế nằm trong khoảng 10 - 25 ghế";
  if (parseInt(data.numberSeat) > 25)
    errors.numberSeat = "Số ghế nằm trong khoảng 10 - 25 ghế";
  if (!Validator.isNumeric(data.numberSeat))
    errors.numberSeat = "Chỉ được nhập số";
  if (Validator.isEmpty(data.numberSeat))
    errors.numberSeat = "Không để trống ô này";
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
