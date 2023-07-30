const jwt = require("jsonwebtoken");
const { ctrlrWrapper } = require("../decorators");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");

const { JWT_SECRET } = process.env;

const authErrorStatus = 401;
const authErrorMessage = "Not authorized";

const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(authErrorStatus, authErrorMessage);
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw HttpError(authErrorStatus, authErrorMessage);
    }

    req.user = user;
    next();
  } catch {
    throw HttpError(authErrorStatus, authErrorMessage);
  }
};

module.exports = { authenticate: ctrlrWrapper(authenticate) };
