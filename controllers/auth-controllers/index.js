const { registerUser } = require("./registerUser");
const { loginUser } = require("./loginUser");
const { logoutUser } = require("./logoutUser");
const { getCurrentUser } = require("./getCurrentUser");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatar } = require("./updateAvatar");
const { verifyUser } = require("./verifyUser");
const { resendVerifyEmail } = require("./resendVerifyEmail");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyUser,
  resendVerifyEmail,
};
