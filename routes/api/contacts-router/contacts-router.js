const express = require("express");
const {
  getAllContacts,
  getContact,
  postContact,
  editContact,
  updateStatusContact,
  deleteContact,
} = require("../../../controllers/contacts-controllers");
const { validateBody } = require("../../../decorators");
const { contactAddSchema } = require("../../../schemas/contacts-schemas");
const { isBodyEmpty, isValidId } = require("../../../middlewares");
const {
  contactUpdateFavoriteSchema,
} = require("../../../schemas/contacts-schemas");

const postErrMessadge = "missing required name field";
const putErrMessadge = "missing fields";

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getContact);

router.post(
  "/",
  isBodyEmpty(400),
  validateBody(contactAddSchema, postErrMessadge),
  postContact
);

router.put(
  "/:contactId",
  isValidId,
  isBodyEmpty(400),
  validateBody(contactAddSchema, putErrMessadge),
  editContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isBodyEmpty(400, "missing field favorite"),
  validateBody(contactUpdateFavoriteSchema, "message"),
  updateStatusContact
);

router.delete("/:contactId", isValidId, deleteContact);

module.exports = router;
