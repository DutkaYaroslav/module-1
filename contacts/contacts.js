const mongoose = require('mongoose');
const contactModel = require('./contacts.model');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

class ContactController {
  async getContacts(req, res, next) {
    try {
      const contacts = await contactModel.find();

      return res.send(contacts);
    } catch (err) {
      next(err);
    }
  }

  async createContact(req, res, next) {
    try {
      const { name, email, password, phone, subscription } = req.body;

      const contact = await contactModel.findOne({ email });

      if (contact) {
        return res.status(400).send({ message: 'User is already exists' });
      }

      const hashPassword = await bcrypt.hash(password, 5);

      await contactModel.create({
        name,
        email,
        phone,
        subscription,
        password: hashPassword,
      });

      return res.status(201).send({
        user: {
          name,
          email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async authorize(req, res, next) {
    try {
      const authorizationHeader = req.get('Authorization') || '';
      console.log(authorizationHeader);
      let token;

      if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
      }

      let userId;
      try {
        userId = await jwt.verify(token, process.env.TOKEN_SECRET).id;
      } catch (err) {
        console.log(err);
      }

      const user = await contactModel.findById(userId);

      if (!user || user.token !== token) {
        return res.status(401).send({ message: 'Authorization failed' });
      }

      req.user = ContactController.validateUserResponse([user]);

      next();
    } catch (err) {
      next(err);
    }
  }

  async getContactById(req, res, next) {
    try {
      const contact = await contactModel.findById(req.params.id);

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
      const contact = await contactModel.findByIdAndUpdate(
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
      const contact = await contactModel.findByIdAndDelete(req.params.id);

      return res.send(contact);
    } catch (err) {
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await contactModel.find({ email });
      console.log(user);
      console.log(email);
      console.log(password);
      console.log(user[0].password);
      if (!user) {
        return res.status(404).send({ message: 'User was not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      console.log(isPasswordValid);

      if (!isPasswordValid) {
        return res.send({ message: 'Authentication failed.' });
      }

      const token = await jwt.sign(
        { id: user[0].id, email: user[0].email },
        process.env.TOKEN_SECRET,
        { expiresIn: '12h' },
      );

      const updatedContact = await contactModel.findByIdAndUpdate(
        user[0].id,
        {
          token,
        },
        { new: true },
      );

      return res.send(ContactController.validateUserResponse([updatedContact]));
    } catch (err) {
      next(err);
    }
  }

  validateContactSignIn(req, res, next) {
    const rulesSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    ContactController.checkValidationError(rulesSchema, req, res, next);
  }

  static validateUserResponse(users) {
    return users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    });
  }

  static checkValidationError(schema, req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).send({ message: error.details[0].message });
    }

    next();
  }
}
module.exports = new ContactController();
