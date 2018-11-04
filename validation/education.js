const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmail(data.school)) {
    errors.school = "School is required";
  }

  if (Validator.isEmail(data.degree)) {
    errors.degree = "Degree is required";
  }
  if (Validator.isEmail(data.from)) {
    errors.from = "Start date is required";
  }
  if (Validator.isEmail(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
