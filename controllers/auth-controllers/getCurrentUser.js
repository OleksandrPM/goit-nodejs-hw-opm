const { ctrlrWrapper } = require("../../decorators");

const successStatus = 200;

const getCurrentUser = (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(successStatus).json({ email, subscription });
};

module.exports = { getCurrentUser: ctrlrWrapper(getCurrentUser) };
