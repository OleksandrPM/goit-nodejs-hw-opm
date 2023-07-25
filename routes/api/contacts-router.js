const express = require("express");
const { contactsControllers } = require("../../controllers");
const { validateBody } = require("../../decorators");
const { contactAddSchema } = require("../../schemas");

const postErrMessadge = "missing required name field";
const putErrMessadge = "missing fields";

const router = express.Router();

router.get("/", contactsControllers.getContacts);

router.get("/:contactId", contactsControllers.getContact);

router.post(
  "/",
  validateBody(contactAddSchema, postErrMessadge),
  contactsControllers.postContact
);

router.delete("/:contactId", contactsControllers.deleteContact);

router.put(
  "/:contactId",
  validateBody(contactAddSchema, putErrMessadge),
  contactsControllers.editContact
);

module.exports = router;
