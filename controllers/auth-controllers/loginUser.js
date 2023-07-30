const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ctrlrWrapper } = require("../../decorators");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
require("dotenv").config();

const { JWT_SECRET } = process.env;

const loginSuccessStatus = 200;
const loginErrStatus = 401;
const loginErrMessage = "Email or password is wrong";

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(loginErrStatus, loginErrMessage);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw HttpError(loginErrStatus, loginErrMessage);
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(loginSuccessStatus).json({
    token: `${token}`,
    user: { email: `${user.email}`, subscription: `${user.subscription}` },
  });
};

module.exports = { loginUser: ctrlrWrapper(loginUser) };
