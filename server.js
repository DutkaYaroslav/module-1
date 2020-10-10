
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const users = require("./contacts/contacts.router");

require("dotenv").config();

const PORT = process.env.PORT;

class UserService {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddleware();
    this.initRoutes();
    this.erroHandler();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "http://localhost:3000" }));
    this.server.use(logger("dev"));
  }

  initRoutes() {
    this.server.use("/users", users);
  }

  erroHandler() {
    this.server.use((err, req, res, next) => {
      if (err) {
        const code = err.status ? err.status : 400;
        res.status(code).send({ message: err.message });
      }
    });
  }

  startListening() {
    this.server.listen(PORT, () =>
      console.log(`Server was started on port: ${PORT}`)
    );
  }
}

module.exports = UserService;

































// const fs = require("fs");
// const { promises: fsPromises } = fs;
// const path = require("path");
// const contactsPath = path.join(__dirname, "./db/contacts.json");

// const express = require("express");
// // const logger = require("morgan");
// // const cors = require("cors");

// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// } = require("./contacts/contacts.js");

// const app = express();
// app.use(express.json());

// // app.get("/", (req, res) => {
// //   res.send("hello");
// // });

// app.get("/", async (req, res) => {
//   try {
//     const testResult = JSON.parse(
//       await fsPromises.readFile(contactsPath, "utf-8")
//     );
//     return res.send(testResult);
//   } catch (error) {
//     next(error);
//   }
//   //  console.log("test server", listContacts());
//   // await res.send(function listContacts() {

//   //   const testResult = fsPromises
//   //     .readFile(contactsPath, "utf-8")
//   //     .then((data) => JSON.parse(data));
//   //   console.log("test contact", testResult);
//   //   return testResult;
//   // });
// });

// app.listen(3000);
// // const express = require("express");
// // const logger = require("morgan");
// // const cors = require("cors");
// // const {
// //   listContacts,
// //   getContactById,
// //   removeContact,
// //   addContact,
// // } = require("./contacts.js");
// // const app = express();
// // app.use(express.json());
// // app.get("/", listContacts());
// // app.listen(3000, () => console.log("Server was started"));
