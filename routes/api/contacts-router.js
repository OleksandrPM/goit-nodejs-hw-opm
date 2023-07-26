const express = require("express");
const { contactsControllers } = require("../../controllers");
const { validateBody } = require("../../decorators");
const { contactAddSchema } = require("../../schemas");
const { isBodyEmpty, isValidId } = require("../../middlewares");
const {
  contactUpdateFavoriteSchema,
} = require("../../schemas/contacts-schemas");

const postErrMessadge = "missing required name field";
const putErrMessadge = "missing fields";

const router = express.Router();

router.get("/", contactsControllers.getContacts);

router.get("/:contactId", isValidId, contactsControllers.getContact);

router.post(
  "/",
  isBodyEmpty(400),
  validateBody(contactAddSchema, postErrMessadge),
  contactsControllers.postContact
);

router.delete("/:contactId", isValidId, contactsControllers.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  isBodyEmpty(400),
  validateBody(contactAddSchema, putErrMessadge),
  contactsControllers.editContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isBodyEmpty(400, "missing field favorite"),
  validateBody(contactUpdateFavoriteSchema, "message"),
  contactsControllers.updateStatusContact
);

module.exports = router;
