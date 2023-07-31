const Joi = require("joi");
const { subscriptionValues } = require("../../constants");

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionValues)
    .required(),
});

module.exports = updateSubscriptionSchema;
