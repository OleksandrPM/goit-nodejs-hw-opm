const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");
const { ctrlrWrapper } = require("../decorators");

const getContacts = async (_, res, next) => {
  const result = await Contact.find();

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
};

const postContact = async (req, res, next) => {
  const result = await Contact.create(req.body);

  if (!result) {
    throw HttpError(400, "Contact already exists");
  }

  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json({ message: "contact deleted" });
};

const editContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json(result);
};

module.exports = {
  getContacts: ctrlrWrapper(getContacts),
  getContact: ctrlrWrapper(getContact),
  postContact: ctrlrWrapper(postContact),
  deleteContact: ctrlrWrapper(deleteContact),
  editContact: ctrlrWrapper(editContact),
  updateStatusContact: ctrlrWrapper(updateStatusContact),
};
