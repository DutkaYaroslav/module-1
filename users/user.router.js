const { Router } = require('express');
const UserController = require('./user.controller.js');

const router = Router();

router.post(
  '/auth/register',
  UserController.validateUserCreate,
  UserController.createNewUser,
);

router.put(
  '/auth/login',
  UserController.validateUserSignIn,
  UserController.signIn,
);

router.get('/', UserController.authorize, UserController.getUsers);

router.get('/current', UserController.authorize, UserController.getCurrentUser);

router.put('/auth/logout', UserController.authorize, UserController.logout);

module.exports = router;
