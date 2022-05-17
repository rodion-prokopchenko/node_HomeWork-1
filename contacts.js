const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const updateContacts = async (data) => {
  const newData = JSON.stringify(data, null, 2);
  await fs.writeFile(contactsPath, newData);
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  console.table(JSON.parse(data));
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data);
  const result = parsedData.find((item) => item.id === contactId.toString());

  if (!result) {
    return null;
  }
  console.log(result);
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const parsedData = JSON.parse(data);

  const result = parsedData.findIndex(
    (item) => item.id === contactId.toString()
  );
  if (result === -1) {
    return null;
  }
  const removeContact = parsedData.splice(result, 1);

  updateContacts(parsedData);
  console.log(removeContact);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath);
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  const parsedData = JSON.parse(data);
  await parsedData.push(newContact);

  updateContacts(parsedData);
  console.log("parsedData: ", parsedData);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
