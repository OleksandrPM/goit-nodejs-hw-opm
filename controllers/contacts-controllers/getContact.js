const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const { ctrlrWrapper } = require("../../decorators");

const successStatus = 200;
const errStatus = 404;

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(errStatus);
  }

  res.status(successStatus).json(result);
};

module.exports = {
  getContact: ctrlrWrapper(getContact),
};
