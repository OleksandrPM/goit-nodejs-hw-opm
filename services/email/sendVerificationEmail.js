const sendEmail = require("./sendEmail");

require("dotenv").config();
const { BASE_URL } = process.env;

const emailSubject = "Verify email";
const emailText = "Click to verify email on goit-nodejs-hw-opm";

const sendVerificationEmail = async (email, token) => {
  const verificationEmail = {
    to: email,
    subject: emailSubject,
    html: `<a href="${BASE_URL}/api/users/verify/${token}" target="_blank">${emailText}</a>`,
  };

  await sendEmail(verificationEmail);
};

module.exports = sendVerificationEmail;
