const { ctrlrWrapper } = require("../../decorators");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const verifySuccessStatus = 200;
const verifySuccessMessage = "Verification successful";
const verifyErrStatus = 404;
const verifyErrMessage = "User not found";

const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(verifyErrStatus, verifyErrMessage);
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();
    
    res
    .status(verifySuccessStatus)
    .json({ message: verifySuccessMessage });
};

module.exports = { verifyUser: ctrlrWrapper(verifyUser) };
