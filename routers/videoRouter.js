import express from "express";
import {
  videosController,
  videoDetailController,
  deleteVideoController,
  uploadGETController,
  uploadPOSTController,
  editVideoGETController,
  editVideoPOSTController,
} from "../controllers/videoControllers";
import { uploadVideo } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get("/", videosController);

//UPLOAD VIDEO
videoRouter.get(routes.upload, uploadGETController);
videoRouter.post(routes.upload, uploadVideo, uploadPOSTController);

videoRouter.get(routes.videoDetail(), videoDetailController);

//EDIT VIDEO
videoRouter.get(routes.editVideo(), editVideoGETController);
videoRouter.post(routes.editVideo(), editVideoPOSTController);

videoRouter.get(routes.deleteVideo(), deleteVideoController);

export default videoRouter;
