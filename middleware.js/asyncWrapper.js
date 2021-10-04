// here we want to set a try, catch block for all functions within the wrapper. But we can still use our await, for individual functions
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // express has a built-in error handler, but we can set up an error handling function at the very end of our routes
      // read express docs
      next(error);
    }
  };
};

module.exports = asyncWrapper;
