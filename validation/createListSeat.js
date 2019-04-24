const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfile(data) {
  const errors = {};

  data.numberSeat = !isEmpty(data.numberSeat) ? data.numberSeat : "";

  if (parseInt(data.numberSeat) < 20)
    errors.numberSeat = "Số ghế nằm trong khoảng 20 - 30 ghế";
  if (parseInt(data.numberSeat) > 30)
    errors.numberSeat = "Số ghế nằm trong khoảng 20 - 30 ghế";
  if (!Validator.isNumeric(data.numberSeat))
    errors.numberSeat = "Chỉ được nhập số";
  if (Validator.isEmpty(data.numberSeat))
    errors.numberSeat = "Không để trống ô này";
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
