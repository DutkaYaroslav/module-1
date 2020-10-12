const { Router } = require("express");
const UserController = require("./contacts.js");

const userRouter = Router();

userRouter.get("/", UserController.getUsers);
userRouter.get("/:id", UserController.getUserById);


userRouter.post(
  "/",
  UserController.validateCreateUser,
  UserController.createUser
);

userRouter.patch(
  "/:id",
  // UserController.validateUserUpdate,
  UserController.updateUser
);

userRouter.delete("/:id", UserController.deleteUser);

module.exports = userRouter;


