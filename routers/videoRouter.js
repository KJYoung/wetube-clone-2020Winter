import express from "express";
import { videosController, videoDetailController, editVideoController, deleteVideoController, uploadGETController, uploadPOSTController } from "../controllers/videoControllers";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get("/", videosController);

videoRouter.get(routes.upload, uploadGETController);
videoRouter.post(routes.upload, uploadPOSTController);

videoRouter.get(routes.videoDetail(), videoDetailController);
videoRouter.get(routes.editVideo, editVideoController);
videoRouter.get(routes.deleteVideo, deleteVideoController);

export default videoRouter;
