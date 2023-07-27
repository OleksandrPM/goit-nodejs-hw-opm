const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const { ctrlrWrapper } = require("../../decorators");

const postContact = async (req, res, next) => {
  const result = await Contact.create(req.body);

  if (!result) {
    throw HttpError(400, "Contact already exists");
  }

  res.status(201).json(result);
};

module.exports = {
  postContact: ctrlrWrapper(postContact),
};
