const express = require('express');
const mongoose = require('mongoose');

const contacts = require('./contacts/contacts.router');
const users = require('./users/user.router');

require('dotenv').config();

const URI = process.env.MONGO_URI || '';
const PORT = process.env.PORT || 3000;

class UserService {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddleware();
    this.initRoutes();
    this.initDb();
    this.erroHandler();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
  }

  initRoutes() {
    this.server.use('/contacts', contacts);
    this.server.use('/users', users);
  }

  async initDb() {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    try {
      await mongoose.connect(URI, opts);
    } catch (err) {
      console.log(`Server was closed with ${err}`);
      process.exit(1);
    }
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
      console.log(`Database connection successful: ${PORT}`),
    );
  }
}

module.exports = UserService;
