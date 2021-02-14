import express from "express";
import {
  videoDetailController,
  deleteVideoController,
  uploadGETController,
  uploadPOSTController,
  editVideoGETController,
  editVideoPOSTController,
} from "../controllers/videoControllers";
import { onlyPrivate, uploadVideo } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

//UPLOAD VIDEO
videoRouter.get(routes.upload, onlyPrivate, uploadGETController);
videoRouter.post(routes.upload, uploadVideo, onlyPrivate, uploadPOSTController);

videoRouter.get(routes.videoDetail(), videoDetailController);

//EDIT VIDEO
videoRouter.get(routes.editVideo(), onlyPrivate, editVideoGETController);
videoRouter.post(routes.editVideo(), onlyPrivate, editVideoPOSTController);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideoController);

export default videoRouter;
