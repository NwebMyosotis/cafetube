import express from "express";
import { getJoin, getLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/login", getLogin);
rootRouter.get("/join", getJoin);

export default rootRouter;
