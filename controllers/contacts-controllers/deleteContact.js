const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const { ctrlrWrapper } = require("../../decorators");

const successStatus = 200;
const successMessage = "contact deleted";
const errStatus = 404;

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(errStatus);
  }

  res.status(successStatus).json({ message: successMessage });
};

module.exports = { deleteContact: ctrlrWrapper(deleteContact) };
