import express from "express";
import { getEdit, getUpload, getWatch } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/watch", getWatch);
videoRouter.get("/watch/edit", getEdit);
videoRouter.get("/upload", getUpload);

export default videoRouter;
