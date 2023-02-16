import express from "express";
import { getEdit, getUpload, getWatch } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", getUpload);
videoRouter.get("/:id([0-9a-f]{24})", getWatch);
videoRouter.get("/:id([0-9a-f]{24})/edit", getEdit);

export default videoRouter;
