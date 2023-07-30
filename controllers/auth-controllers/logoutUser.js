const { ctrlrWrapper } = require("../../decorators");
const { User } = require("../../models/user");

const successStatus = 204;
const successMessage = "Logout success";

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(successStatus).json({ message: `${successMessage}` });
};

module.exports = { logoutUser: ctrlrWrapper(logoutUser) };
