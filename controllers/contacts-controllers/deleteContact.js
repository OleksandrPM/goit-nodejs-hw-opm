const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const { ctrlrWrapper } = require("../../decorators");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json({ message: "contact deleted" });
};

module.exports = { deleteContact: ctrlrWrapper(deleteContact) };
