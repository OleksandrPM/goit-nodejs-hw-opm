const { ctrlrWrapper } = require("../../decorators");
const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

require("dotenv").config();
const { BASE_URL } = process.env;

const userNotFoundStatus = 404;
const isVerifiedErrorStatus = 400;
const successResendStatus = 200;

const isVerifiedErrorMsg = "Verification has already been passed";
const successResendMsg = "Verification email resend";

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  console.log(email);

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(userNotFoundStatus);
  }

  if (user.verify) {
    throw HttpError(isVerifiedErrorStatus, isVerifiedErrorMsg);
  }

  const verificationEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click to verify email on goit-nodejs-hw-opm</a>`,
  };

  await sendEmail(verificationEmail);

  res.status(successResendStatus).json({ message: successResendMsg });
};

module.exports = { resendVerifyEmail: ctrlrWrapper(resendVerifyEmail) };
