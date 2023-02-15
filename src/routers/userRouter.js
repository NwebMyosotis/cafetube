import express from "express";
import { getEdit, getProfile } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/profile", getProfile);
userRouter.get("/edit", getEdit);

export default userRouter;
