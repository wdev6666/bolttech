const { Router } = require("express");
const {
  createUser,
  findUserByEmail,
  login,
} = require("../services/user.service");

const userRouter = Router();

userRouter.get("/", findUserByEmail);
userRouter.post("/", createUser);
userRouter.post("/login", login);

module.exports = userRouter;
