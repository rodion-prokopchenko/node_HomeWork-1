const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// const readFile = async () => {
//   let data = await fs.readFile(contactsPath);
//   console.log(JSON.parse(data));
// };
// readFile();
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
  console.log(result);
  if (result === -1) {
    return null;
  }
  const removeContact = data.splice(result, 1);
  updateContacts(data);
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

  const jData = data.push(newContact);
  const newData = JSON.stringify(jData);
  console.log("newData: ", newData);
  console.log("newContact: ", newContact);

  return await fs.writeFile(contactsPath, newData);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
