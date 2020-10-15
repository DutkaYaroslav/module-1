const path = require("path");
const contactsPath = path.join(__dirname, "../db/contacts.json");
const Joi = require("joi");

const fs = require("fs");
const { promises: fsPromises } = fs;



class UserController {

   async parsed() {
      const contact = await  fsPromises.readFile(contactsPath, 'utf-8')
      const result = await JSON.parse(contact)
      return result;
  }
   

  async getUsers(req, res, next) {
    try {

      const dataBase = await fsPromises.readFile(contactsPath, 'utf-8')
      return res.send(JSON.parse(dataBase))
    } catch (err) {
      next(err);
    }
  }

  getUserById = async (req, res, next) => {
    try {

      const result = await this.parsed()
      

      const oneId = result.filter((contact) => {
        return contact.id === Number(req.params.id);
      });
      fsPromises.readFile(contactsPath, JSON.stringify(oneId))

      return res.send(oneId);

    } catch (err) {
      next(err)
    }
  }

   createUser = async (req, res, next) => {
    try {

      const result = await this.parsed()
      
      result.push({
        id: result.length + 1,
        ...req.body,
      });
      fsPromises.writeFile(contactsPath, JSON.stringify(result))
      return res.send({ message: "User created" });
    } catch (err) {
      next(err);

    }
  }

  updateUser = async (req, res, next) => {
    try {
    
      const result = await this.parsed()



      const final = {
        id: Number(req.params.id),
        ...req.body,
      };

      const NewList = result.map(contact => {

        if (contact.id === Number(req.params.id)) {
          return final;
        }
        return contact
      })
      fsPromises.writeFile(contactsPath, JSON.stringify(NewList))

      return res.send(NewList);
    } catch (err) {
      next(err);
    }
  }

  deleteUser = async (req, res, next,) => {
    try {
      const result = await this.parsed()
      
      const deleted = result.filter((contact) => {
        return contact.id !== Number(req.params.id);
      });
      fsPromises.writeFile(contactsPath, JSON.stringify(deleted))

      return res.send(deleted);
    } catch (err) {
      next(err);
    }
  }


  validateCreateUser(req, res, next) {
    const createSchemaValidator = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required()
    });
    const result = createSchemaValidator.validate(req.body)
    if (result.error) {
      res.send(result.error)
    }
    next()
  }

}
module.exports = new UserController();
