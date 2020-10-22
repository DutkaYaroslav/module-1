const mongoose = require('mongoose');
const userModel = require('./contacts.model');

class ContactController {
  async getContacts(req, res, next) {
    try {
      const contacts = await userModel.find();

      return res.send(contacts);
    } catch (err) {
      next(err);
    }
  }

  async createContact(req, res, next) {
    try {
      const contact = await userModel.create(req.body);

      return res.send(contact);
    } catch (err) {
      next(err);
    }
  }

  async getContactById(req, res, next) {
    try {
      const contact = await userModel.findById(req.params.id);

      if (!contact) {
        return res.status(404).send('contact was not found');
      }

      return res.send(contact);
    } catch (err) {
      next(err);
    }
  }

  async updateContactById(req, res, next) {
    try {
      const contact = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
      );

      if (!contact) {
        return res.status(404).send('contact was not found');
      }

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }

  async deleteContact(req, res, next) {
    try {
      const contact = await userModel.findByIdAndDelete(req.params.id);

      return res.send(contact);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = new ContactController();
