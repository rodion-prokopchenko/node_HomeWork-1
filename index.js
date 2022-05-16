const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const contactAction = require("./contacts");

const arr = hideBin(process.argv);
const argv = require("yargs").argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactAction.listContacts();
      break;

    case "get":
      contactAction.getContactById(id);
      break;

    case "add":
      contactAction.addContact(name, email, phone);
      break;

    case "remove":
      contactAction.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
console.log("argv: ", argv);
invokeAction(argv);
