const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const { ctrlrWrapper } = require("../../decorators");

const successStatus = 200;
const errStatus = 404;

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(errStatus);
  }

  res.status(successStatus).json(result);
};

module.exports = {
  updateStatusContact: ctrlrWrapper(updateStatusContact),
};
