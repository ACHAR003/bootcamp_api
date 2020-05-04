const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);
  console.log(err.name);

  let error = { ...err };
  error.message = err.message;
  console.log(err);
  //Mongoose id error
  if (err.name === 'CastError') {
    const message = `Resource not found  with the ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //Mongoose duplicate error handle
  if (err.code === 11000) {
    const message = 'Duplicate Value exists';
    error = new ErrorResponse(message, 400);
  }
  //Mongoose missing fields
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    data: error.message || 'Please check for the server',
  });
};

module.exports = errorHandler;
