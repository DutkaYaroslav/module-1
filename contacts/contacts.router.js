const { Router } = require('express');
const ContactController = require('./contacts.js');

const contactRouter = Router();

contactRouter.get('/', ContactController.getContacts);
contactRouter.get('/:id', ContactController.getContactById);

contactRouter.post('/', ContactController.createContact);

contactRouter.patch('/:id', ContactController.updateContactById);

contactRouter.delete('/:id', ContactController.deleteContact);

module.exports = contactRouter;
