import express from "express";
import {
  deleteVideo,
  getEdit,
  getUpload,
  getWatch,
  postEdit,
  postUpload,
} from "../controllers/videoController";
import { needLogin } from "../middleware";

const videoRouter = express.Router();

videoRouter.route("/upload").all(needLogin).get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", getWatch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);

export default videoRouter;
