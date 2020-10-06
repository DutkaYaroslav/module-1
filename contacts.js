const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

// async function listContacts() {
//   const testResult = JSON.parse(
//     await fsPromises.readFile(contactsPath, "utf-8")
//   );
//   // .then((data) => JSON.parse(data));
//   console.log("test contact", testResult);
//   return testResult;
// }

function listContacts(req, res) {
  fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => res.send(JSON.parse(data)));
}

// async function listContacts(next) {
//   try {
//     const data = await fsPromises.readFile(contactsPath, "utf-8");
//     const objData = JSON.parse(data);
//     return objData;
//   } catch (err) {
//     next(err);
//   }
// }

function getContactById(contactId) {
  fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const parsed = JSON.parse(data);
      const result = parsed.filter((contact) => {
        if (contactId === contact.id) {
          return contact;
        }
      });
      return result;
    })
    .then((data) => console.log(data));
}

function removeContact(contactId) {
  fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const parsed = JSON.parse(data);
      const result = parsed.filter((contact) => {
        return contact.id !== contactId;
      });

      const final = JSON.stringify(result);

      return final;
    })
    .then((final) => fsPromises.writeFile(contactsPath, final))
    .then(() => listContacts());
}

function addContact(name, email, phone) {
  fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const parsed = JSON.parse(data);
      const fullObject = { name, email, phone };
      console.log(name, email, phone);
      parsed.push(fullObject);
      const result = JSON.stringify(parsed);

      return result;
    })
    .then((result) => fsPromises.writeFile(contactsPath, result))
    .then(() => listContacts());
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
