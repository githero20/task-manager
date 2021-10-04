// creating a custom error and passing it to the next() middleware, index.js
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
// constructor method is invoked when you're calling a new instance of a class
// super method, used for a child class to invoke the super methods of a parent class

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
