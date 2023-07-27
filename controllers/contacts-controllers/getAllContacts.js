const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const { ctrlrWrapper } = require("../../decorators");

const getAllContacts = async (_, res, next) => {
  const result = await Contact.find();

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlrWrapper(getAllContacts),
};
