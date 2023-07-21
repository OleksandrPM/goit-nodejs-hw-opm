const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index !== -1) {
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } else {
    return null;
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  if (!isContactPresent(contacts, newContact)) {
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } else {
    return null;
  }
};

const updateContact = async (id, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    return null;
  }

  contacts[contactIndex] = { id, name, email, phone };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[contactIndex];
};

function isContactPresent(contacts, body) {
  const { name, email, phone } = body;
  return Boolean(
    contacts.find(
      (contact) =>
        contact.name === name &&
        contact.email === email &&
        contact.phone === phone
    )
  );
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
