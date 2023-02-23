import express from "express";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { needLogout } from "../middleware";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/login").all(needLogout).get(getLogin).post(postLogin);
rootRouter.route("/join").all(needLogout).get(getJoin).post(postJoin);

export default rootRouter;
