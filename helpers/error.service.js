const handleError = (message, code, params = {}) => {

  const errorResponse = {
    statusCode: code,
    message,
    data: params,
  };

  return errorResponse;
};

module.exports = handleError;
