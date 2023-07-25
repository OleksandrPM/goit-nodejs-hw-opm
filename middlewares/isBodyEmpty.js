const { HttpError } = require("../helpers");

const emptyBodyMsg = "All fields must be filled";

const isBodyEmpty = (req, res, next) => {
  const { length } = Object.keys(req.body);

  if (!length ) {
    next(HttpError(400, emptyBodyMsg));
  }

  next();
};

module.exports = { isBodyEmpty };
