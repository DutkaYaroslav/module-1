const mongoose = require('mongoose');
const userModel = require('./contacts.model');

class UserController {
  async getContacts(req, res, next) {
    try {
      const users = await userModel.find();

      return res.send(users);
    } catch (err) {
      next(err);
    }
  }

  async createContact(req, res, next) {
    try {
      const user = await userModel.create(req.body);

      return res.send(user);
    } catch (err) {
      next(err);
    }
  }

  async getContactById(req, res, next) {
    try {
      const user = await userModel.findById(req.params.id);

      if (!user) {
        return res.status(404).send('user was not found');
      }

      return res.send(user);
    } catch (err) {
      next(err);
    }
  }

  async updateContactById(req, res, next) {
    try {
      const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!user) {
        return res.status(404).send('user was not found');
      }

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }

  async deleteContact(req, res, next) {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);

      return res.send(user);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new UserController();
