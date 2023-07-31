const Joi = require("joi");
const { emailRegexp, subscriptionValues } = require("../../constants");

const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
  subscription: Joi.string().valid(...subscriptionValues),
});

module.exports = userSignupSchema;
