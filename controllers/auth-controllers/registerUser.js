const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/user");
const { ctrlrWrapper } = require("../../decorators");
const { HttpError } = require("../../helpers");

const registerSuccessStatus = 201;
const registerErrStatus = 409;
const conflictErrMessage = "Email in use";

const saltAmount = 10;

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(registerErrStatus, conflictErrMessage);
  }

  const hashPassword = await bcrypt.hash(password, saltAmount);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(registerSuccessStatus).json({
    email: newUser.email,
    subsription: newUser.subscription,
  });
};

module.exports = { registerUser: ctrlrWrapper(registerUser) };
