const express = require("express");
const { contactsControllers } = require("../../controllers");
const { validateBody } = require("../../decorators");
const { contactAddSchema } = require("../../schemas");
const { isBodyEmpty } = require("../../middlewares");

const postErrMessadge = "missing required name field";
const putErrMessadge = "missing fields";

const router = express.Router();

router.get("/", contactsControllers.getContacts);

router.get("/:contactId", contactsControllers.getContact);

router.post(
  "/",
  isBodyEmpty,
  validateBody(contactAddSchema, postErrMessadge),
  contactsControllers.postContact
);

router.delete("/:contactId", contactsControllers.deleteContact);

router.put(
  "/:contactId",
  isBodyEmpty,
  validateBody(contactAddSchema, putErrMessadge),
  contactsControllers.editContact
);

module.exports = router;
