import express from "express";
import {
  finishGithubLogin,
  getEdit,
  getProfile,
  logout,
  postEdit,
  startGithubLogin,
} from "../controllers/userController";
import { needLogin, needLogout } from "../middleware";

const userRouter = express.Router();

userRouter.get("/:id([0-9a-f]{24})", needLogin, getProfile);
userRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(needLogin)
  .get(getEdit)
  .post(postEdit);
userRouter.get("/logout", needLogin, logout);

userRouter.get("/github/start", needLogout, startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;
