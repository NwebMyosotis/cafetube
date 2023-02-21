import express from "express";
import { getEdit, getProfile, logout } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id([0-9a-f]{24})", getProfile);
userRouter.get("/:id([0-9a-f]{24})/edit", getEdit);
userRouter.get("/logout", logout);

export default userRouter;
