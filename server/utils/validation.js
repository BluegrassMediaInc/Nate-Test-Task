/**
 * Summary. validation Wrapper.
 *
 * Description. validations done in api.
 *
 * @link   URL
 * @file   This files defines functions to validate provided email.
 * @since  1.0.0
 */

const isEmpty = require("lodash/isEmpty");
const moment = require("moment");
const isEmail = require("validator/lib/isEmail");

/**
 * Summary. email validation
 *
 * Description. used for email validation
 *
 * @since      1.0.0
 * @access     export public
 *
 * @param {string}   value       API req data i.e email to be validated.
 * @param {string}   res      API result data i.e if email is valid.
 *
 */
const validateEmail = (value) => {
  if (!value || isEmpty(value.trim())) {
    return "The field is mandatory";
  }
  if (value.length > 50) {
    return "Maximum 50 characters allowed";
  }
  if (!isEmail(value)) {
    return "Invalid Email";
  }
  return "";
};

const dbDate = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
};

module.exports = {
  validateEmail,
  dbDate,
};
