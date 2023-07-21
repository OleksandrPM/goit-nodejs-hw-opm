const express = require("express");

const { contactsControllers } = require("../../controllers");

const router = express.Router();

router.get("/", contactsControllers.getContacts);

router.get("/:contactId", contactsControllers.getContact);

router.post("/", contactsControllers.postContact);

router.delete("/:contactId", contactsControllers.deleteContact);

router.put("/:contactId", contactsControllers.editContact);

module.exports = router;
