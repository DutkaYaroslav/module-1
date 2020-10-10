// const fs = require("fs");
// const { promises: fsPromises } = fs;
const path = require("path");
const contactsPath =  path.join(__dirname, "../db/contacts.json");
const Joi = require("joi");



class UserController {
  getUsers(req, res, next) {
    try {
      
      return res.send(contactsPath);
    } catch (err) {
      next(err);
    }
  }

  createUser(req, res, next) {
    try {
      contactsPath.push({
        id: contactsPath.length + 1,
        ...req.body,
      });

      return res.send({ message: "User created" });
    } catch (err) {
      next(err);
    }
  }

  updateUser(req, res, next) {
    try {
      const targetUsersIndex = UserController.findUserIndexById(
        req.params.id,
        res
      );

      if (targetUsersIndex === undefined) {
        return res.status(404).send({ message: "User not found" });
      }

      contactsPath[targetUsersIndex] = {
        ...contactsPath[targetUsersIndex],
        ...req.body,
      };

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }

  deleteUser(req, res, next) {
    try {
      const targetUsersIndex = UserController.findUserIndexById(
        req.params.id,
        res
      );

      if (targetUsersIndex === undefined) {
        return;
      }

      contactsPath.splice(targetUsersIndex, 1);

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  }

  validateUserUpdate(req, res, next) {
    const updateSchemaValidator = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
    });

    UserController.checkValidationError(updateSchemaValidator, req, res, next);
  }

  validateCreateUser(req, res, next) {
    const createSchemaValidator = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
    });

    UserController.checkValidationError(createSchemaValidator, req, res, next);
  }

  static checkValidationError(schema, req, res, next) {
    const { error } = schema.validate(req.body);

    if (error) {
      const { message } = error.details[0];
      return res.status(400).send({ error: message });
    }
    next();
  }

  static findUserIndexById(userId, res) {
    const id = parseInt(userId);
    const targetUsersIndex = contactsPath.findIndex((user) => user.id === id);

    if (targetUsersIndex === -1) {
      return res.status(404).send({ message: "Not found" });
    }

    return targetUsersIndex;
  }
}

module.exports = new UserController();
