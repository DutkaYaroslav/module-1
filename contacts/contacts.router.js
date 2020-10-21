const { Router } = require('express');
const UserController = require('./contacts.js');

const userRouter = Router();

userRouter.get('/', UserController.getContacts);
userRouter.get('/:id', UserController.getContactById);

userRouter.post('/', UserController.createContact);

userRouter.patch('/:id', UserController.updateContactById);

userRouter.delete('/:id', UserController.deleteContact);

module.exports = userRouter;
