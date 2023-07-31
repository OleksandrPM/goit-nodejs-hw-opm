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
const {
  isBodyEmpty,
  isValidId,
  authenticate,
} = require("../../../middlewares");
const {
  contactUpdateFavoriteSchema,
} = require("../../../schemas/contacts-schemas");

const postErrMessadge = "missing required name field";
const putErrMessadge = "missing fields";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:contactId", isValidId, getContact);

contactsRouter.post(
  "/",
  isBodyEmpty(400),
  validateBody(contactAddSchema, postErrMessadge),
  postContact
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isBodyEmpty(400),
  validateBody(contactAddSchema, putErrMessadge),
  editContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isBodyEmpty(400, "missing field favorite"),
  validateBody(contactUpdateFavoriteSchema, "message"),
  updateStatusContact
);

contactsRouter.delete("/:contactId", isValidId, deleteContact);

module.exports = contactsRouter;
