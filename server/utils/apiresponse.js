/**
 * Summary. Wrapper for api response.
 *
 * Description. Standard response for all api's.
 *
 * @link   URL
 * @file   This files defines functions to return success and error response for api's.
 * @since  1.0.0
 */

const { logError } = require("../logger/logger");

/**
 * Summary. api success response
 *
 * Description. used for giving standard success response in all api's
 *
 * @since      1.0.0
 * @access     export public
 *
 * @param {object}   res       API response data.
 * @param {object}   data      API result data.
 *
 */
const onSuccess = (res, data) => {
  res.status(200).json({
    error: false,
    data,
  });
};

/**
 * Summary. api error response
 *
 * Description. used for giving standard error response in all api's
 *
 * @since      1.0.0
 * @access     export public
 *
 * @param {object}   res       API response data.
 * @param {object}   err      API error data.
 * @param {string}   errorCode      API errorCode.
 * @param {boolean}   isLogger      is logging has to be done.
 * @param {integer}   statusCode      API statusCode.
 *
 */
const onError = (res, err, errorCode, isLogger, statusCode = 500) => {
  if (isLogger) {
    logError(err);
  }
  const response = {
    error: true,
    message: err.message || "Some error occurred.",
  };
  if (errorCode) {
    response.code = errorCode;
  }
  res.status(statusCode).json(response);
};

module.exports = {
  onSuccess,
  onError,
};
