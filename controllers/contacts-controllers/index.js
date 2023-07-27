const { getAllContacts } = require("./getAllContacts");
const { getContact } = require("./getContact");
const { postContact } = require("./postContact");
const { editContact } = require("./editContact");
const { updateStatusContact } = require("./updateStatusContact");
const { deleteContact } = require("./deleteContact");

module.exports = {
  getAllContacts,
  getContact,
  postContact,
  editContact,
  updateStatusContact,
  deleteContact,
};
