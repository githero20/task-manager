const { CustomAPIError } = require("../errors/customError");
// here we import the class
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(500)
    .json({ msg: "Error: Something went wrong, please try again later." });
};

module.exports = errorHandler;
