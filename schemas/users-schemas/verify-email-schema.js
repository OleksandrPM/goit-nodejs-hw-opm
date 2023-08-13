const Joi = require("joi");
const { emailRegexp } = require("../../constants");

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = verifyEmailSchema;
