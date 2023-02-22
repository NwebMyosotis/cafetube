import express from "express";
import {
  finishGithubLogin,
  getEdit,
  getProfile,
  logout,
  startGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id([0-9a-f]{24})", getProfile);
userRouter.get("/:id([0-9a-f]{24})/edit", getEdit);
userRouter.get("/logout", logout);

userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;
