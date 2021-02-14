import express from "express";
import routes from "../routes";
import {
  addCommentController,
  registerViewController,
  deleteCommentController,
} from "../controllers/apiControllers";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerViewController);
apiRouter.post(routes.addComment, addCommentController);
apiRouter.post(routes.deleteComment, deleteCommentController);
export default apiRouter;
