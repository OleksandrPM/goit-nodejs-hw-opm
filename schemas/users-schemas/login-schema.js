const Joi = require("joi");
const { emailRegexp } = require("../../constants");

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

module.exports = userLoginSchema;
