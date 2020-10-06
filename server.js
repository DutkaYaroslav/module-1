// const express = require("express");
// // const logger = require("morgan");
// // const cors = require("cors");

// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// } = require("./contacts.js");

// const app = express();
// app.use(express.json());

// // app.get("/", (req, res) => {
// //   res.send("hello");
// // });

// // app.get("/", (req, res) => {
// //   console.log("test server", listContacts());
// //   res.send(listContacts());
// // });

// app.get("/", listContacts());

// app.listen(3000);
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");
const app = express();
app.use(express.json());
app.get("/", listContacts());
app.listen(3000, () => console.log("Server was started"));
