const Joi = require("joi");

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = contactUpdateFavoriteSchema;
