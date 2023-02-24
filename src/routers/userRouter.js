import express from "express";
import {
  finishGithubLogin,
  getEdit,
  getProfile,
  logout,
  postEdit,
  startGithubLogin,
} from "../controllers/userController";
import { needLogin, needLogout, uploadAvatar } from "../middleware";

const userRouter = express.Router();

userRouter.get("/:id([0-9a-f]{24})", getProfile);
userRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(needLogin)
  .get(getEdit)
  .post(uploadAvatar.single("avatar"), postEdit);
userRouter.get("/logout", needLogin, logout);

userRouter.get("/github/start", needLogout, startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;
