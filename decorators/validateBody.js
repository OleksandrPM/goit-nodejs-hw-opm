const { HttpError } = require("../helpers");

const validateBody = (schema, messadge) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, !messadge ? error.messadge : messadge));
    }

    next();
  };

  return func;
};

module.exports = { validateBody };
