const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const { ctrlrWrapper } = require("../../decorators");

const successStatus = 201;
const errStatus = 400;
const errMessage = "Contact already exists";

const postContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  if (!result) {
    throw HttpError(errStatus, errMessage);
  }

  res.status(successStatus).json(result);
};

module.exports = {
  postContact: ctrlrWrapper(postContact),
};
