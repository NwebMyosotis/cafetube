import express from "express";
import { registerViews } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.route("/video/:id([0-9a-f]{24})/views").post(registerViews);

export default apiRouter;
