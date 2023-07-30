const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");
const { ctrlrWrapper } = require("../../decorators");

const defaultPage = 1;
const defaultAmountByPage = 20;

const successStatus = 200;
const errStatus = 404;

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.body;
  const {
    page = defaultPage,
    limit = defaultAmountByPage,
    ...query
  } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, ...query },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");

  if (!result) {
    throw HttpError(errStatus);
  }

  res.status(successStatus).json(result);
};

module.exports = {
  getAllContacts: ctrlrWrapper(getAllContacts),
};
